'use strict';
const shell = require('shelljs');
const fs = require('fs');

// Copy files into root directory
const gentlyCopy = require('gently-copy');
const filesToCopy = ['src'];
const localRoot = process.env.INIT_CWD || '..';

gentlyCopy(filesToCopy, localRoot);

// Parse config files and update as needed
const jestObject = {
	"preset": "jest-puppeteer",
	"globals": {
		"window": {}
	}
}

let packageFile = require(`${localRoot}/package.json`);
packageFile = packageFile;
packageFile.jest = jestObject;

fs.writeFileSync('package.json', JSON.stringify(packageFile, null, 2));
