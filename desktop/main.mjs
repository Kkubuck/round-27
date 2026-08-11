import {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  Menu,
  powerSaveBlocker,
} from "electron";
import { writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const desktopDirectory = dirname(fileURLToPath(import.meta.url));
const projectDirectory = join(desktopDirectory, "..");
const appHtml = join(projectDirectory, "desktop-dist", "index.html");
const appIcon = join(projectDirectory, "desktop-resources", "icon.png");

let mainWindow;
let displaySleepBlocker;

const safePngName = (fileName) => {
  const candidate = basename(String(fileName || "round-27.png"));
  const safe = candidate.replace(/[^a-zA-Z0-9._-]/g, "-");
  return safe.toLowerCase().endsWith(".png") ? safe : `${safe}.png`;
};

ipcMain.handle("round27:save-png", async (event, dataUrl, fileName) => {
  if (!event.senderFrame.url.startsWith("file://")) {
    throw new Error("Untrusted result image source");
  }

  const marker = "data:image/png;base64,";
  if (typeof dataUrl !== "string" || !dataUrl.startsWith(marker)) {
    throw new Error("Expected a PNG data URL");
  }

  const encoded = dataUrl.slice(marker.length);
  if (encoded.length > 32_000_000) throw new Error("Result image is too large");

  const ownerWindow = BrowserWindow.fromWebContents(event.sender);
  const result = await dialog.showSaveDialog(ownerWindow, {
    title: "Save Round 27 Story",
    defaultPath: join(app.getPath("pictures"), safePngName(fileName)),
    filters: [{ name: "PNG image", extensions: ["png"] }],
  });

  if (result.canceled || !result.filePath) return false;
  await writeFile(result.filePath, Buffer.from(encoded, "base64"));
  return true;
});

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 470,
    height: 860,
    minWidth: 360,
    minHeight: 640,
    useContentSize: true,
    show: false,
    title: "Round 27",
    icon: appIcon,
    backgroundColor: "#000000",
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(desktopDirectory, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
    },
  });

  mainWindow.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (!url.startsWith("file://")) event.preventDefault();
  });
  mainWindow.webContents.on("before-input-event", (event, input) => {
    if (input.type !== "keyDown" || input.key !== "F11") return;
    event.preventDefault();
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
  });
  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("closed", () => { mainWindow = undefined; });

  await mainWindow.loadFile(appHtml);
};

const singleInstance = app.requestSingleInstanceLock();
if (!singleInstance) app.quit();

app.on("second-instance", () => {
  if (!mainWindow) return;
  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.show();
  mainWindow.focus();
});

app.whenReady().then(async () => {
  Menu.setApplicationMenu(null);
  displaySleepBlocker = powerSaveBlocker.start("prevent-display-sleep");
  await createWindow();

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) await createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("will-quit", () => {
  if (displaySleepBlocker !== undefined && powerSaveBlocker.isStarted(displaySleepBlocker)) {
    powerSaveBlocker.stop(displaySleepBlocker);
  }
});
