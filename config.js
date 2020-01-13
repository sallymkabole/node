//create and export config variables
///create container for environments
var environments = {};
environments.staging= {
    'port':3000,
        'envName':'staging'
};

environments.production= {
    'port':5000,
    'envName':'production'
    };
    //determine environment to be used
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';
    // Check that the current environment is one of the environments above, if not default to staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;
    // Export the module
module.exports = environmentToExport;