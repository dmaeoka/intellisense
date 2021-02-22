// const path = require("path");
const express = require("express");
const app = express(); // create express app

// Serve up content from build directory
app.use(express.static(__dirname + '/build', { maxAge: 86400000 }));

app.listen(process.env.PORT || 5000);
