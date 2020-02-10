'use strict';
const fs = require('fs');

// Copy files into root directory
const gentlyCopy = require('gently-copy');
const filesToCopy = ['runtest.js', 'jest-puppeteer.config.js'];
const localRoot = process.env.INIT_CWD || '.';

gentlyCopy(filesToCopy, localRoot);

// Parse config files and update as needed
const jestObject = {
	"preset": "jest-puppeteer",
	"globals": {
		"window": {}
	}
};

const devDependencies = {
	"jest": "^25.1.0",
	"shelljs": "^0.8.3",
	"yargs": "^15.1.0",
	"jest-puppeteer": "^4.4.0",
	"puppeteer": "^2.0.0"
};

// Grab the main package.json file from project root
let packageFile = require(`${localRoot}/package.json`);
// Add the Jest config
packageFile.jest = jestObject;
// Test script
packageFile.scripts.test = "jest";

// Add dependancies manually. Solid option.
packageFile.devDependencies = { ...packageFile.devDependencies, ...devDependencies };
// Puppet-theatre should be running latest stuff.
packageFile.dependencies['puppet-theatre'] = "latest";

// Overwrite package.json with the updated version
fs.writeFileSync(`${localRoot}/package.json`, JSON.stringify(packageFile, null, 2));
