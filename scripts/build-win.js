const builder = require('electron-builder');

builder.build({
    config: {
      "appId": "local.time-recorder",
      "copyright": "Copyright © 2020 R-Imai",
      "directories": {
        "buildResources": "../build"
      },
      "win": {
        "target": "dir",
        "icon": "../public/icon.ico"
      }
    }
});
