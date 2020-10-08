const fs = require('fs');
const me = module.exports = {};

let PATH_FILE;
let ARRAY = [];

me.pathFile = function(aPathFile){
    PATH_FILE = aPathFile;
    ARRAY = readFileJSON(PATH_FILE);
    if (!Array.isArray(ARRAY)) {
        ARRAY = []
    }
};

me.addItem = function(aItem){
    ARRAY.push(aItem);
    saveFileJSON(PATH_FILE, ARRAY);
};

me.getItem = function(){
    let item = ARRAY.shift();
    saveFileJSON(PATH_FILE, ARRAY);
    return item;
};

const saveFileJSON = function(aPathFile, aData){
    fs.writeFileSync(aPathFile, JSON.stringify(aData));
};

const readFileJSON = function(aPathFile){
    return JSON.parse(fs.readFileSync(aPathFile));
};