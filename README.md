# Budget Dashboard — PWA

## Files in this project

| File | What it does |
|------|-------------|
| `index.html` | The whole app — HTML, CSS, and JS in one file |
| `manifest.json` | Tells the browser your app name, icon, and colours |
| `sw.js` | Service worker — makes the app work offline |
| `icon-192.png` | App icon (192×192px) — you need to add this |
| `icon-512.png` | App icon (512×512px) — you need to add this |

## How to get it live (GitHub Pages)

1. Create a new repo on github.com — call it `budget-app`
2. Upload all files from this folder into the repo
3. Go to Settings → Pages → Source → Deploy from branch → main → / (root) → Save
4. Wait ~1 minute, then your app is live at:
   `https://YOUR-USERNAME.github.io/budget-app`

## How to install on iPhone

1. Open your GitHub Pages URL in Safari on your iPhone
2. Tap the Share button (box with arrow pointing up)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" — done

The app now lives on your home screen, opens fullscreen,
and works offline thanks to the service worker.

## How to install on Mac (Chrome)

1. Open your GitHub Pages URL in Chrome
2. Look for the install icon in the address bar (looks like a monitor with a down arrow)
3. Click it and follow the prompt

## Icons

You need to create two icon files:
- `icon-192.png` — 192×192 pixels
- `icon-512.png` — 512×512 pixels

Free tools to make them:
- favicon.io — lets you generate from text or emoji
- Canva — design a simple icon and export at the right sizes

A simple dark square with a $ sign works great as a budget app icon.

## Adding the receipt scanner later

When you're ready for Phase 3, look for this comment in index.html:

  <!-- RECEIPT SCANNER PLACEHOLDER -->

That's exactly where the scan button goes. The form fields below it
(expense-name, expense-amount, expense-category) are what the AI
will pre-fill after reading the receipt. Nothing else needs to change.
