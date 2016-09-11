'use strict'
var path = require('path');
module.exports={
  devtool: "#inline-source-map",
  context:path.join(__dirname,'/js'),
  entry:"./app.js",
  output:{
    filename:"build.js"
  },
  watch:true
};
