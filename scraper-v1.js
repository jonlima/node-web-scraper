// Gets some general movie information from IMDB

"use strict";

var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();

app.listen('7000', function() {
	console.log('App listening on port 7000');
})