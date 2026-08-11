# Round 27

Round 27 is a focused Cindy and AMRAP pace timer for web, Android, and Windows. It keeps the 20-minute clock visible, recalculates the target pace after every completed round, counts rounds, and creates a 1080×1920 workout result image.

## Product

- Dynamic pace: remaining time is divided by the remaining goal rounds after every tap.
- Cindy default: 5 pull-ups, 10 push-ups, 15 squats.
- 27 Round Challenge preset: 20 minutes, 27 target rounds.
- Offline Android bundle with no account, analytics, ads, or network dependency.
- Native Android haptics, screen-awake behavior, back-button handling, and result sharing.
- Browser result download and Android native share sheet.
- Five generated CrossFit story backgrounds with device-local selection memory.
- Windows-native PNG save dialog, fullscreen support, and display sleep prevention.

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

## Windows

Run the desktop app during development:

```bash
npm run desktop:dev
```

Build both Windows x64 distributions:

```bash
npm run desktop:package
```

The click-to-run portable app and installer are written to:

```text
release/portable/Round-27-Portable-1.0.0-x64.exe
release/installer/Round-27-Setup-1.0.0-x64.exe
```

The generated executables are intentionally excluded from Git. Pushing the repository runs the Windows workflow and makes both files downloadable from GitHub Actions. Pushing a version tag such as `v1.0.0` also creates a GitHub Release containing both executables.

Public Windows distribution should use a trusted code-signing certificate to avoid an unsigned-app SmartScreen warning. Do not commit signing certificates or passwords.

## Release validation

```bash
npm run check:release
```

This builds the web app, verifies the rendered site, creates and syncs the offline mobile bundle, verifies the Android assets, and checks the Windows desktop bundle. GitHub Actions builds a debug APK and both Windows executables.

## Store materials

Play Store copy, launch hooks, hashtags, privacy text, and a release checklist are under [`store/`](store/).
