"use strict";
 
const fs          = require("fs");
const path        = require("path");
const Sequelize   = require("sequelize");
const env         = process.env.NODE_ENV || "development";
let config        = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
let db            = {};
let basename      = path.basename(__filename);



for (let key in config){
  if(config[key].ENV != null){
    config[key] = process.env[config[key].ENV];
  }
};

if(process.env.JAWSDB_URL) {
  var sequelize = new Sequelize(process.env.JAWSDB_URL);
}
else if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} 
else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
 
 
fs
    .readdirSync(__dirname)
    .filter((file) => {
        // return (file.indexOf(".") !== 0) && (file !== "index.js");
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js' ) && (file !== "index.js");
    })
    .forEach((file) => {
        let model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });
 
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
 
 
db.sequelize = sequelize;
db.Sequelize = Sequelize;


 
module.exports = db;