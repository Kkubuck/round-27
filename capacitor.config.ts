import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.jisanglee.round27",
  appName: "Round 27",
  webDir: "mobile-dist",
  bundledWebRuntime: false,
  android: {
    backgroundColor: "#000000",
    allowMixedContent: false,
    webContentsDebuggingEnabled: false,
  },
};

export default config;
