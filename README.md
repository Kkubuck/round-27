# Round 27

Round 27 is a focused Cindy and AMRAP pace timer for web and Android. It keeps the 20-minute clock visible, recalculates the target pace after every completed round, counts rounds, and creates a 1080×1920 workout result image.

## Product

- Dynamic pace: remaining time is divided by the remaining goal rounds after every tap.
- Cindy default: 5 pull-ups, 10 push-ups, 15 squats.
- 27 Round Challenge preset: 20 minutes, 27 target rounds.
- Offline Android bundle with no account, analytics, ads, or network dependency.
- Native Android haptics, screen-awake behavior, back-button handling, and result sharing.
- Browser result download and Android native share sheet.

## Requirements

- Node.js 22.13 or newer
- Java 21
- Android SDK with the platform required by `android/variables.gradle`

## Web

```bash
npm ci
npm run dev
npm test
```

The hosted site uses the vinext/Sites project in `.openai/hosting.json`.

## Android

```bash
npm ci
npm run android:debug
```

The debug APK is written to:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

To prepare a Play Store bundle:

```bash
npm run android:bundle
```

The Play Store requires a signed release App Bundle. Keep the keystore outside Git and configure release signing before uploading the `.aab`.

## Release validation

```bash
npm run check:release
```

This builds the web app, verifies the rendered site, creates and syncs the offline mobile bundle, and verifies the Android assets. GitHub Actions also builds a debug APK for each push and pull request.

## Store materials

Play Store copy, launch hooks, hashtags, privacy text, and a release checklist are under [`store/`](store/).
