const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStarted: (callback: (statistics: any) => void) => callback({}),
  getStaticData: () => console.log("static"),
});
