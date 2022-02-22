const ncp = require("ncp").ncp;
ncp("src/package.json", "dist/package.json");
