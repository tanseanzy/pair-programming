

    const envr = require('../../');


    class EnvrReference {
        constructor(id) {
            this.id = id;
        }
    }

    
    module.exports = {
          a: 100
        , c: 3
        , yeah: [{
            thisIs: {
                suchFun: envr.get('fancy')
            }
        }]
        , fake: new EnvrReference('fake')
    };