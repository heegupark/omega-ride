const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, 'server/public/');
const staticMiddlware = express.static(publicPath);

module.exports = staticMiddlware;
