const licenseChecker = require('license-checker-rseidelsohn');
const { name, version } = require('./package.json');

const ROOT_PROJECT = `${name}@${version}`;

const IGNORED_PACKAGES = [ROOT_PROJECT, '@metamask/sdk'];

const ALLOWED_LICENSES = [
  'MIT',
  'ISC',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'Apache-2.0',
];

licenseChecker.init(
  {
    start: __dirname,
    excludePackages: IGNORED_PACKAGES.join(';'),
    onlyAllow: ALLOWED_LICENSES.join(';'),
  },
  (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.info('Licenses check passed.');
  },
);
