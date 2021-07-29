'use strict';

const path      = require('path');
const fs        = require('fs');


const has       = (...keys) => keys.some(key => process.argv.includes(`--${key}`));
const is        = (...keys) => keys.some(key => key === process.env.NODE_ENV);
const hasSub    = (...keys) => keys.some(key => process.argv.includes(`--subenv-${key}`));
const isSub     = (...keys) => keys.some(key => key === process.env.NODE_SUB_ENV);


// used to laod values into configs from secrets.{env}.js files
const references = new Set();
const EnvrReference = class {
    constructor(id) {
        this.id = id;
    }
};



// get from cli
let env = has('live', 'prod', 'production') ? 'production' : (
    has('staging', 'integration') ? 'integration' : (
        has('testing') ? 'testing' : (
            has('dev', 'develop', 'development') ? 'development' : null)));

// get from env
if (!env) {
    env = is('live', 'prod', 'production') ? 'production' : (
        is('staging', 'integration') ? 'integration' : (
            is('testing') ? 'testing' : (
                is('dev', 'develop', 'development') ? 'development' : '[not set]')));
}





// get from cli
let subEnv = hasSub('live', 'prod', 'production') ? 'production' : (
    hasSub('staging', 'integration') ? 'integration' : (
        hasSub('testing') ? 'testing' : (
            hasSub('dev', 'develop', 'development') ? 'development' : null)));

// get from env
if (!subEnv) {
    subEnv = isSub('live', 'prod', 'production') ? 'production' : (
        isSub('staging', 'integration') ? 'integration' : (
            isSub('testing') ? 'testing' : (
                isSub('dev', 'develop', 'development') ? 'development' : null)));
}








// export
module.exports = {

    // export env string
    get env() {
        return env;
    }


    // export env string
    , get subEnv() {
        return subEnv;
    }




    , isProduction() {
        if (env === '[not set]') throw new Error(`Canont determine the environment: it was not set! `);
        return env === 'production';
    }

    , isIntegration() {
        if (env === '[not set]') throw new Error(`Canont determine the environment: it was not set! `);
        return env === 'integration';
    }

    , isTesting() {
        if (env === '[not set]') throw new Error(`Canont determine the environment: it was not set! `);
        return env === 'testing';
    }

    , isDevelopment() {
        if (env === '[not set]') throw new Error(`Canont determine the environment: it was not set! `);
        return env === 'development';
    }




    // load env dependent config
    , config(directory, secretsDirectory) {
        if (env === '[not set]') throw new Error(`Canont get config file: the environment was not set!`);

        const envPath       = path.join(directory, `config.${env}${(subEnv ? '.'+subEnv: '')}.js`);
        const defaultPath   = path.join(directory, 'config.js');
        const secretsPath   = path.join((secretsDirectory ? secretsDirectory : directory), `secrets.${(subEnv ? subEnv: env)}.js`);

        let envStats, stats, envConfig, config, secretsStats, secrets;





        // get the environment dependent version
        try {
            envStats = fs.statSync(envPath);
        } catch (err) {
            throw new Error(`Failed to stat configfile ${envPath}. Does the file exists?`);
        }

        if (!envStats.isFile()) throw new Error(`Cannot load configfile ${envPath}. Is it a file?`);

        try {
            envConfig = require(envPath);
        } catch (err) {
            console.log(`Failed to load configfile ${envPath}:`);
            throw err;
        };





        // get the default version
        try {
            stats = fs.statSync(defaultPath);
        } catch (err) {
            // this file is optional
        }

        if (stats) {
            if (!stats.isFile()) throw new Error(`Cannot load configfile ${defaultPath}. Is it a file?`);

            try {
                config = require(defaultPath);
            } catch (err) {
                console.log(`Failed to load configfile ${defaultPath}:`);
                throw err;
            };
        }


        // merge
        config = config ? Object.assign(envConfig, config) : envConfig;




        // get the secrets
        try {
            secretsStats = fs.statSync(secretsPath);
        } catch (err) {}


        if (secretsStats && envStats.isFile()) {
            try {
                secrets = require(secretsPath);
            } catch (err) {
                console.log(`Failed to load secrests file ${secretsPath}:`);
                throw err;
            };
        }


        // replace secrest
        const replaceSecrets = (input) => {
            if (Array.isArray(input)) input.forEach(item => replaceSecrets(item));
            else if (typeof input === 'object' && input !== null) {

                Object.keys(input).forEach((key) => {
                    if (input[key] instanceof EnvrReference || 
                        input[key] &&
                        input[key].constructor && 
                        input[key].constructor.name === 'EnvrReference') {
                        
                        if (secrets && secrets[input[key].id] !== undefined) input[key] = secrets[input[key].id];
                        else throw new Error(`Failed to get secret for ${input[key].id} from ${secretsPath}!`);
                    } else replaceSecrets(input[key]);
                });
            }
        }

        replaceSecrets(config);


        // should eb complete by now
        return config;
    }
}








module.exports.get = (id) => {
    const reference = new EnvrReference(id);
    references.add(reference);
    return reference;
}
