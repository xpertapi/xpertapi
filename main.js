// Importing required modules
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');

// Create the main Electron window
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
        icon: path.join(__dirname, '', 'logo.ico')
    });

    mainWindow.loadFile('index.html');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Handle API requests from renderer
ipcMain.handle('make-request', async (_, { method, url, headers, body }) => {
    try {
        const response = await axios({
            method,
            url,
            headers,
            data: body,
        });
        return { success: true, data: response.data, status: response.status, headers: response.headers };
    } catch (error) {
        return { success: false, error: error.message, response: error.response };
    }
});
