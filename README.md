<div align="center">

# ROUND 27

**A focused Cindy / AMRAP pace timer built for the workout floor.**

[![Latest release](https://img.shields.io/github/v/release/Kkubuck/round-27?display_name=tag&sort=semver&style=flat-square)](https://github.com/Kkubuck/round-27/releases/latest)
[![Cross-platform build](https://img.shields.io/github/actions/workflow/status/Kkubuck/round-27/release.yml?branch=main&label=cross-platform%20build&style=flat-square)](https://github.com/Kkubuck/round-27/actions/workflows/release.yml)
[![Downloads](https://img.shields.io/github/downloads/Kkubuck/round-27/total?style=flat-square)](https://github.com/Kkubuck/round-27/releases)
[![Platforms](https://img.shields.io/badge/platforms-Windows%20%7C%20macOS%20%7C%20Android-111111?style=flat-square)](#download)

[Download](https://github.com/Kkubuck/round-27/releases/latest) | [Features](#features) | [Build](#build-from-source) | [Security](SECURITY.md)

</div>

![Round 27 live timer and workout result showcase](docs/round-27-readme-showcase.png)

<p align="center"><sub>Live countdown | adaptive round target | round history | rep totals | 1080 x 1920 Story export</sub></p>

## Download

Open the [latest release](https://github.com/Kkubuck/round-27/releases/latest) and select the file for your device.

| Platform | File | Use |
| --- | --- | --- |
| Windows x64 | `Round-27-Setup-<version>-x64.exe` | One-click installer |
| Windows x64 | `Round-27-Portable-<version>-x64.exe` | Run without installation |
| Apple Silicon Mac | `Round-27-<version>-macOS-arm64.dmg` | M-series Mac installer image |
| Intel Mac | `Round-27-<version>-macOS-x64.dmg` | Intel Mac installer image |
| macOS archive | Matching `.zip` file | Portable app archive |
| Android | `Round-27-Android-<version>.apk` | Sideloadable testing build |

Each platform includes a matching `SHA256SUMS-*.txt` file. Verify the downloaded file before opening it.

### Unsigned build notice

Windows and macOS builds are not code-signed or notarized. Windows SmartScreen may show **Unknown publisher**, and macOS Gatekeeper may require **Control-click > Open** for the first launch. The APK is debug-signed for direct installation and testing; it is not a Play Store production build.

## Features

- A clear 20-minute AMRAP clock with large, high-contrast numbers.
- Cindy defaults: 5 pull-ups, 10 push-ups, and 15 squats per round.
- Dynamic pacing: remaining workout time is divided by remaining goal rounds after every completed round.
- Current-round timer, previous-round time, target pace, undo, pause, and reset.
- Five original workout backgrounds for the result card.
- A clean 1080 x 1920 PNG result card ready for an Instagram Story.
- Native result saving on Windows and macOS; Android system share sheet support.
- Fullscreen support, display sleep prevention, and offline operation.
- No account, ads, analytics, or cloud dependency.

## Use

1. Set the workout duration and target rounds. The default challenge is 20 minutes / 27 rounds.
2. Press **Start**.
3. Press **+ Round** every time a full round is complete.
4. Open **Result** when the workout ends, choose a background, and save or share the Story image.

### Keyboard shortcuts

| Key | Action |
| --- | --- |
| `Space` | Complete a round |
| `P` | Pause or resume |
| `F11` | Toggle fullscreen |
| `Control + Command + F` | Toggle fullscreen on macOS |

## Privacy

Round 27 runs locally and does not transmit workout data. It has no login, telemetry, advertising SDK, or remote API. Preferences stay on the device, and a result image is written only after the user chooses a save or share action.

## Build from source

All builds require Node.js 22.13 or newer.

```bash
npm ci
npm run check:release
npm run lint
npm audit --omit=dev
```

### Windows

```powershell
npm run desktop:windows
```

Outputs: `release/installer/` and `release/portable/`.

### macOS

Build on the matching Mac architecture with Xcode Command Line Tools installed:

```bash
npm run desktop:mac -- --arm64
# or
npm run desktop:mac -- --x64
```

Outputs: `release/macos/`.

### Android

Java 21 and the Android SDK are required.

```bash
npm run android:debug
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`.

## Release

Every push and pull request builds Windows x64, macOS arm64, macOS x64, and Android artifacts on their native GitHub runners. A version tag waits for every platform to pass, then publishes all packages and platform-specific SHA-256 files in one GitHub Release.

```bash
git tag v1.1.0
git push origin v1.1.0
```

Generated binaries, local deployment metadata, environment files, signing certificates, and credentials are excluded from Git. Production signing material must be stored outside the repository and supplied through encrypted release secrets.

## Disclaimer

Round 27 is an independent training utility and is not affiliated with or endorsed by CrossFit, Inc. Exercise responsibly and scale movements to your ability.
