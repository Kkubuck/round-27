# Release checklist

## Before the first internal test

- [x] Confirm the public support contact in the privacy policy.
- [ ] Confirm the final developer name and application package ID.
- [ ] Create a release keystore and store it outside Git.
- [ ] Run `npm run check:release`.
- [ ] Run `npm run android:debug` and install the APK on at least one physical Android phone.
- [ ] Test screen awake for a full 20-minute workout.
- [ ] Test pause/resume after locking and unlocking the phone.
- [ ] Test 0, 1, 26, 27 and 100+ round result layouts.
- [ ] Test native sharing to Instagram Stories, Messages and Files.
- [ ] Test audio and haptics with silent mode and Bluetooth audio.
- [ ] Test Android back behavior on setup, results and the live timer.
- [ ] Install the Windows setup and portable builds on a clean Windows x64 account.
- [ ] Install both macOS DMGs on matching Apple Silicon and Intel Macs.
- [ ] Verify native Story saving on Windows and macOS.
- [ ] Verify every published file against its platform SHA-256 manifest.

## Direct download release

- [ ] Confirm Windows x64 installer and portable executable are present.
- [ ] Confirm macOS arm64 and x64 DMG and ZIP files are present.
- [ ] Confirm the debug-signed Android APK installs on a physical device.
- [ ] Confirm unsigned/notarization notices are included in the release documentation.

## Play Console

- [ ] Upload a signed `.aab`, not a debug APK.
- [ ] Complete the Data safety form as no data collected.
- [ ] Publish the privacy policy at a public HTTPS URL.
- [ ] Add phone screenshots that show the real application UI.
- [ ] Use `Round 27: AMRAP Timer` as the store title.
- [ ] Do not use celebrity names, movie branding, or third-party logos in store metadata.
- [ ] Start with an internal testing track before closed or production testing.

## Release decision

- [ ] No crashes or timer drift during three complete 20-minute sessions.
- [ ] Result totals and average pace match manual calculations.
- [ ] Saved story image has no clipped or overlapping text.
- [ ] Fresh install works with airplane mode enabled.
