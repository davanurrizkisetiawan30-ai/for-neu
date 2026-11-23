# Birthday Website for Neu 🎂

Static site: HTML + CSS + vanilla JS. No build step, no backend.

## Run
Double-click `index.html`, or for the best result run a tiny local server:
`python -m http.server 8000` → open http://localhost:8000

## 1. Photos
Put images in `assets/photos/`: `photo-1.jpeg` … `photo-6.jpeg` and `gemilang-cover.webp` (album art).
Captions: `PHOTOS` in `js/main.js`. Memory cards (title, story, date, photo): `MEMORIES` in `js/main.js`.
Missing photos show an elegant placeholder, nothing breaks.

## 2. Music
Put your file at `assets/music/gemilang.mp3`.

## 3. Lyrics
Edit the `lyrics` array in `js/lyrics.js`: `{ time: seconds, text: "your line" }`, sorted by time.

## 4. Sound effects
Put in `assets/sounds/`: `celebration.mp3`, `sparkle.mp3`, `applause.mp3`, `bonk.mp3`, `bruh.mp3`, `birthday.mp3`.
If a file is missing, a soft synth sound plays instead.

## 5. Customize text
Opening/intro/message: `index.html` and `js/main.js`. Quiz questions: `js/game.js`. Letter: `#paper` in `index.html`.

## 6. Deploy
- **GitHub Pages:** push to a repo → Settings → Pages → Deploy from branch `main` / root.
- **Vercel:** import the repo, framework "Other", no build command, output directory `.`.

Tip: music/sound only start after a user click (browser rules). Audio files are loaded from relative paths, so keep the folder structure.
