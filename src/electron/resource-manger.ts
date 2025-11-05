import osUtils from "os-utils";
import fs from "fs";

import os from "os";
import { BrowserWindow } from "electron";

const POLLING_INTERVAL = 500; // in milliseconds

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const cpuUsage = await getCPUUsage();
    const ramUsage = getMemoryUsage();
    const diskUsage = getStorageUsage();
    mainWindow.webContents.send("statistics", {
      cpuUsage,
      ramUsage,
      diskUsage,
    });
  }, POLLING_INTERVAL);
}

function getCPUUsage() {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
}

function getMemoryUsage() {
  return 1 - osUtils.freememPercentage();
}

export function getStaticData() {
  const totalStorage = getStorageUsage().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemory = Math.floor(osUtils.totalmem() / 1024); // in GB
  return {
    totalStorage,
    cpuModel,
    totalMemory,
  };
}

function getStorageUsage() {
  // Placeholder function: Implement storage usage retrieval if needed
  const stats = fs.statfsSync(process.platform === "win32" ? "C:\\" : "/");
  const total = stats.blocks * stats.bsize;
  const free = stats.bfree * stats.bsize;

  return {
    total: Math.floor(total / (1024 * 1024 * 1024)), // in GB
    usage: 1 - free / total,
  };
}
