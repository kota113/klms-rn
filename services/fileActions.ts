import {Platform} from "react-native";
import {errorCodes, isErrorWithCode, saveDocuments} from "@react-native-documents/picker";
import * as IntentLauncher from "expo-intent-launcher";
import * as LegacyFileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import {apiClient} from "./api/client";

type DownloadTarget = {
  fileName?: string;
  mimeType?: string;
  url: string;
};

export type DownloadedFile = {
  fileName: string;
  mimeType: string | null;
  uri: string;
};

const MIME_TYPES_BY_EXTENSION: Record<string, string> = {
  csv: "text/csv",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  gif: "image/gif",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  m4a: "audio/mp4",
  mov: "video/quicktime",
  mp3: "audio/mpeg",
  mp4: "video/mp4",
  pdf: "application/pdf",
  png: "image/png",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  txt: "text/plain",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  zip: "application/zip",
};

const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

const decodeBase64Bytes = (base64: string) => {
  const bytes: number[] = [];
  let buffer = 0;
  let bits = 0;

  for (const char of base64.replace(/=+$/, "")) {
    const value = BASE64_CHARS.indexOf(char);
    if (value < 0) {
      continue;
    }

    buffer = (buffer << 6) | value;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((buffer >> bits) & 0xff);
    }
  }

  return bytes;
};

const sanitizeFileName = (fileName: string) => fileName.replace(/[<>:"/\\|?*]/g, "_");

const getDownloadFileName = (downloadUrl: string) => {
  try {
    const {pathname} = new URL(downloadUrl);
    const fileName = decodeURIComponent(pathname.split("/").filter(Boolean).pop() || "");
    if (fileName) {
      return sanitizeFileName(fileName);
    }
  } catch {
    // Fall back to a timestamped name below when the URL cannot be parsed.
  }

  return `klms-download-${Date.now()}`;
};

const getHeaderValue = (headers: Record<string, string>, name: string) => {
  const header = Object.entries(headers).find(([key]) => key.toLowerCase() === name.toLowerCase());
  return header?.[1] || null;
};

const normalizeMimeType = (mimeType: string | null | undefined) => {
  const normalized = mimeType?.split(";")[0]?.trim().toLowerCase();
  return normalized || null;
};

const getMimeTypeFromFileName = (fileName: string | null | undefined) => {
  const extension = fileName?.split(".").pop()?.toLowerCase();
  return extension ? MIME_TYPES_BY_EXTENSION[extension] || null : null;
};

const getMagicBytesMimeType = (bytes: number[], fileName: string) => {
  if (bytes.length < 4) {
    return null;
  }

  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
    return "application/pdf";
  }

  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return "image/png";
  }

  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }

  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) {
    return "image/gif";
  }

  if (bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04) {
    return getMimeTypeFromFileName(fileName) || "application/zip";
  }

  if (bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0) {
    return getMimeTypeFromFileName(fileName) || "application/x-ole-storage";
  }

  return null;
};

const getMimeTypeFromMagicBytes = async (fileUri: string, fileName: string) => {
  try {
    const base64 = await LegacyFileSystem.readAsStringAsync(fileUri, {
      encoding: LegacyFileSystem.EncodingType.Base64,
      length: 16,
      position: 0,
    });
    return getMagicBytesMimeType(decodeBase64Bytes(base64), fileName);
  } catch (error) {
    console.error("Error reading file magic bytes:", error);
    return null;
  }
};

const getContentDispositionFileName = (contentDisposition: string | null) => {
  if (!contentDisposition) {
    return null;
  }

  const encodedMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (encodedMatch?.[1]) {
    return sanitizeFileName(decodeURIComponent(encodedMatch[1].trim()));
  }

  const quotedMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
  if (quotedMatch?.[1]) {
    return sanitizeFileName(quotedMatch[1].trim());
  }

  return null;
};

export const isCanvasDownloadUrl = (requestUrl: string) => {
  try {
    const parsedUrl = new URL(requestUrl);
    return (
      /\/files\/\d+\/download\/?$/.test(parsedUrl.pathname) ||
      parsedUrl.pathname.includes("/file_contents/") ||
      parsedUrl.searchParams.has("download")
    );
  } catch {
    return false;
  }
};

const getDownloadUrl = (sourceUrl: string) => {
  try {
    const parsedUrl = new URL(sourceUrl);

    if (isCanvasDownloadUrl(sourceUrl)) {
      return sourceUrl;
    }

    const courseFileMatch = parsedUrl.pathname.match(/\/(?:api\/v1\/)?courses\/(\d+)\/files\/(\d+)\/?$/);
    if (courseFileMatch) {
      return `${parsedUrl.origin}/courses/${courseFileMatch[1]}/files/${courseFileMatch[2]}/download`;
    }

    const fileMatch = parsedUrl.pathname.match(/\/(?:api\/v1\/)?files\/(\d+)\/?$/);
    if (fileMatch) {
      return `${parsedUrl.origin}/files/${fileMatch[1]}/download`;
    }
  } catch {
    return sourceUrl;
  }

  return sourceUrl;
};

const isCanvasFileApiUrl = (sourceUrl: string) => {
  try {
    const parsedUrl = new URL(sourceUrl);
    return /\/api\/v1\/(?:courses\/\d+\/|groups\/\d+\/|users\/[^/]+\/)?files\/\d+\/?$/.test(parsedUrl.pathname);
  } catch {
    return false;
  }
};

const resolveDownloadTarget = async (sourceUrl: string, fallbackUrl: string, cookieHeader: string | null): Promise<DownloadTarget> => {
  if (isCanvasDownloadUrl(sourceUrl)) {
    return {url: sourceUrl};
  }

  if (isCanvasFileApiUrl(sourceUrl)) {
    try {
      const response = await fetch(sourceUrl, {
        headers: {
          Accept: "application/json",
          ...(cookieHeader ? {Cookie: cookieHeader} : {}),
        },
      });

      if (response.ok) {
        const file = await response.json();
        if (typeof file?.url === "string" && file.url.length > 0) {
          return {
            fileName: typeof file.display_name === "string" ? file.display_name : file.filename,
            mimeType: normalizeMimeType(file["content-type"]) || undefined,
            url: file.url,
          };
        }
      }
    } catch (error) {
      console.error("Error resolving Canvas file API URL:", error);
    }
  }

  return {url: getDownloadUrl(fallbackUrl)};
};

export const downloadCanvasFile = async (sourceUrl: string, fallbackUrl = sourceUrl): Promise<DownloadedFile | null> => {
  const cacheDirectory = LegacyFileSystem.cacheDirectory;
  if (!cacheDirectory) {
    return null;
  }

  const cookieHeader = await apiClient.getSessionCookieHeader();
  const downloadTarget = await resolveDownloadTarget(sourceUrl, fallbackUrl, cookieHeader);
  let fileName = downloadTarget.fileName || getDownloadFileName(downloadTarget.url);
  const destination = `${cacheDirectory}${fileName}`;
  const result = await LegacyFileSystem.downloadAsync(downloadTarget.url, destination, {
    headers: {
      ...(cookieHeader ? {Cookie: cookieHeader} : {}),
    },
  });

  if (result.status < 200 || result.status >= 300) {
    throw new Error(`Download failed with status ${result.status}`);
  }

  let fileUri = result.uri;
  const contentDisposition = getHeaderValue(result.headers, "content-disposition");
  const headerFileName = getContentDispositionFileName(contentDisposition);
  if (headerFileName && headerFileName !== fileName) {
    const renamedUri = `${cacheDirectory}${headerFileName}`;
    await LegacyFileSystem.moveAsync({from: result.uri, to: renamedUri});
    fileName = headerFileName;
    fileUri = renamedUri;
  }

  const mimeType = await getMimeTypeFromMagicBytes(fileUri, fileName) || getMimeTypeFromFileName(fileName);
  return {fileName, mimeType, uri: fileUri};
};

export const openDownloadedFile = async ({fileName, mimeType, uri}: DownloadedFile) => {
  if (Platform.OS === "android" && mimeType) {
    try {
      const contentUri = await LegacyFileSystem.getContentUriAsync(uri);
      await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: contentUri,
        flags: 1,
        type: mimeType,
      });
      return;
    } catch (error) {
      console.error("Error opening Android downloaded file:", error);
    }
  }

  const canShare = await Sharing.isAvailableAsync();
  if (!canShare) {
    throw new Error("Sharing is not available on this device.");
  }

  await Sharing.shareAsync(uri, {
    dialogTitle: fileName,
    mimeType: mimeType || undefined,
  });
};

export const saveDownloadedFile = async ({fileName, mimeType, uri}: DownloadedFile) => {
  const [savedFile] = await saveDocuments({
    copy: true,
    fileName,
    mimeType: mimeType || undefined,
    sourceUris: [uri],
  });

  if (savedFile.error) {
    throw new Error(savedFile.error);
  }

  return savedFile.name || fileName;
};

export const isFileActionCanceled = (error: unknown) => {
  return isErrorWithCode(error) && error.code === errorCodes.OPERATION_CANCELED;
};
