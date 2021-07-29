# envr

Checks for commandline parameters or environment variables to determine in which environment to run your application.


[![npm](https://img.shields.io/npm/dm/envr.svg?style=flat-square)](https://www.npmjs.com/package/envr)
[![Travis](https://img.shields.io/travis/eventEmitter/envr.svg?style=flat-square)](https://travis-ci.org/eventEmitter/envr)
[![node](https://img.shields.io/node/v/envr.svg?style=flat-square)](https://nodejs.org/)



## Configuring the Environment

Reads the `NODE_ENV` variable

    export NODE_ENV=production

values can be:

- prodcution
- live
- integration
- staging
- testing
- dev
- development

where production === live, integration === staging and dev === development

The `NODE_ENV` variable is overriden by setting any of those flags:

    --production (--live)
    --integration (--staging)
    --testing
    --dev (--development)






## API

Get the current environment


    const envr = require('envr');

    console.log(envr.env) // production, integration, testing or development


There are also methods to directl yquery the environment

    const envr = require('envr');

    envr.isProduction()
    envr.isIntegration()
    envr.isTesting()
    envr.isDevelopment()

All of thoe methods throw errors if the environment was not set



## Load environment aware js config files

Loads js config files from a directory using the pattern `${dirname}/config.${envr.env}.js`.
All toplevel properties of a config.js file that may reside in the same directory as the other
config files will overrife properties of the environment specific config file. The configfiles
msut export an obejct.


    const envr = require('envr');

    // async, __dirname is the dir containgin the configs
    cosnt config = envr.config(__dirname);