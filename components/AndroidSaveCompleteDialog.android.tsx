import React from "react";
import {AlertDialog, Host, Text as ComposeText, TextButton} from "@expo/ui/jetpack-compose";

type AndroidSaveCompleteDialogProps = {
  fileName: string | null;
  onDismiss: () => void;
};

export default function AndroidSaveCompleteDialog({fileName, onDismiss}: AndroidSaveCompleteDialogProps) {
  if (!fileName) {
    return null;
  }

  return (
    <Host matchContents>
      <AlertDialog onDismissRequest={onDismiss}>
        <AlertDialog.Title>
          <ComposeText>保存しました</ComposeText>
        </AlertDialog.Title>
        <AlertDialog.Text>
          <ComposeText>{`${fileName} を保存しました。`}</ComposeText>
        </AlertDialog.Text>
        <AlertDialog.ConfirmButton>
          <TextButton onClick={onDismiss}>
            <ComposeText>OK</ComposeText>
          </TextButton>
        </AlertDialog.ConfirmButton>
      </AlertDialog>
    </Host>
  );
}
