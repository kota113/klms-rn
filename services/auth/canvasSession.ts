export const CANVAS_BASE_URL = 'https://lms.keio.jp';
export const CANVAS_SESSION_SOURCE = 'klms-canvas-session';

export type CanvasSessionMessage =
  | {
  source: typeof CANVAS_SESSION_SOURCE;
  type: 'session-ready';
  userId: string;
}
  | {
  source: typeof CANVAS_SESSION_SOURCE;
  type: 'not-authenticated';
  reason: string;
};

export function parseCanvasSessionMessage(data: string): CanvasSessionMessage | null {
  try {
    const parsed = JSON.parse(data);
    if (parsed?.source !== CANVAS_SESSION_SOURCE) {
      return null;
    }
    return parsed as CanvasSessionMessage;
  } catch {
    return null;
  }
}

export function buildCanvasSessionDetectorScript(): string {
  const source = JSON.stringify(CANVAS_SESSION_SOURCE);

  return `
    (() => {
      const source = ${source};

      function post(payload) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ source, ...payload }));
      }

      function getCookie(name) {
        const cookies = document.cookie ? document.cookie.split('; ') : [];
        const cookie = cookies.find((item) => item.startsWith(name + '='));
        return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : '';
      }

      function detectSession() {
        const env = window.ENV || {};
        const csrfToken = getCookie('_csrf_token');

        if (env.current_user_id && csrfToken) {
          post({
            type: 'session-ready',
            userId: String(env.current_user_id),
          });
          return;
        }

        post({
          type: 'not-authenticated',
          reason: 'Canvas session is not ready yet.',
        });
      }

      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(detectSession, 250);
      } else {
        document.addEventListener('DOMContentLoaded', () => setTimeout(detectSession, 250), { once: true });
      }
    })();
    true;
  `;
}
