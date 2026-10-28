import { spawn } from 'node:child_process';

export function openUrl(url: string): void {
  try {
    const parsed = new URL(url);
    if (!['https:', 'http:'].includes(parsed.protocol)) return;

    const command =
      process.platform === 'darwin'
        ? 'open'
        : process.platform === 'win32'
          ? 'cmd'
          : 'xdg-open';
    const args =
      process.platform === 'win32'
        ? ['/c', 'start', '', parsed.toString()]
        : [parsed.toString()];

    spawn(command, args, { stdio: 'ignore', detached: true })
      .on('error', () => {
        // Opening a browser is best-effort; callers display the URL too.
      })
      .unref();
  } catch {
    // Ignore invalid URLs and synchronous launch failures.
  }
}
