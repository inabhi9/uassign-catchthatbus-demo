/**
 * Created by abhinav on 14/11/15.
 */
var merge = require('deepmerge');
var localConf = {};
try {
    localConf = require('./main-local');
} catch (e) {
}


var defaultConf = {
    salt: 'dsdBxn7EbdsdBxn7EbxsrxsrdsdBxn7Ebxsr',
    dbUrl: 'mongodb://localhost:27017/catchthatbus'
};


module.exports = merge(defaultConf, localConf);
