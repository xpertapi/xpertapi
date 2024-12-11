const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    makeRequest: (options) => ipcRenderer.invoke('make-request', options),
});
