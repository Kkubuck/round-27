import { contextBridge, ipcRenderer } from "electron";

const nativeBridge = Object.freeze({
  isNative: true,
  platform: process.platform === "darwin" ? "macos" : "windows",
  haptic: async () => {},
  sharePng: (dataUrl, fileName) => ipcRenderer.invoke(
    "round27:save-png",
    dataUrl,
    fileName,
  ),
});

contextBridge.exposeInMainWorld("Round27Native", nativeBridge);
