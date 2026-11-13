# DuoGramm — first patch

This patch is intended for the imported Telegram Web K source tree.

## Apply
Upload/replace the included files at the same paths in `Yynor/DuoGramm-base`.

## What this patch changes
- Sets the package name to `duogramm`.
- Changes the page metadata and app version label to DuoGramm.
- Adds `src/lib/duogramm/hiddenChats.ts`, a small per-account local preference utility.

## Important status
This is the first source patch, not a finished DuoGramm release.
The hidden-chat utility is not yet wired into the dialog list, search UI, or account lifecycle.
The existing Telegram Web K authentication/API configuration has not been changed.
Do not assume the inherited API credentials are authorized for a public fork; verify Telegram's API terms and obtain credentials for your deployment if required.

The original project is GPL-3.0. Keep the license and required notices, and publish corresponding source when distributing a modified version under the GPL.
The `duogramm.example` URL in `vite.config.ts` and `public/index.html` is a placeholder; replace it with the real domain before production deployment.
