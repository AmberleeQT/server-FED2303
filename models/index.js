const fs = require('fs');
const path = require('path');
const db = require('../db/index');
const baseName = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file)=> {
    return (
      file.indexOf(".") !== 0 && file !== baseName && file.slice(-3) === '.js'
    )
  })

module.exports = db