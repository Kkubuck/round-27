import { App } from "@capacitor/app";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";
import { Share } from "@capacitor/share";

type HapticKind = "light" | "heavy" | "success";

type Round27NativeBridge = {
  isNative: boolean;
  platform: "android" | "windows";
  haptic: (kind?: HapticKind) => Promise<void>;
  sharePng: (dataUrl: string, fileName: string) => Promise<void | boolean>;
};

declare global {
  interface Window {
    Round27Native?: Round27NativeBridge;
  }
}

const haptic = async (kind: HapticKind = "light") => {
  if (kind === "success") {
    await Haptics.notification({ type: NotificationType.Success });
    return;
  }

  await Haptics.impact({
    style: kind === "heavy" ? ImpactStyle.Heavy : ImpactStyle.Light,
  });
};

const sharePng = async (dataUrl: string, fileName: string) => {
  const marker = ";base64,";
  const markerIndex = dataUrl.indexOf(marker);
  if (markerIndex < 0) throw new Error("Expected a base64 PNG data URL");

  const saved = await Filesystem.writeFile({
    path: `round27/${fileName}`,
    data: dataUrl.slice(markerIndex + marker.length),
    directory: Directory.Cache,
    recursive: true,
  });

  await Share.share({
    title: "Round 27",
    text: "Cindy AMRAP result",
    url: saved.uri,
    dialogTitle: "Share workout result",
  });
};

window.Round27Native = {
  isNative: true,
  platform: "android",
  haptic,
  sharePng,
};

App.addListener("backButton", async () => {
  const event = new CustomEvent("round27:native-back", { cancelable: true });
  const unhandled = window.dispatchEvent(event);
  if (unhandled) await App.exitApp();
});
