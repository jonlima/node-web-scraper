// Gets some general movie information from IMDB

"use strict";

var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();

app.get('/scrape', function(req, res){
	var url = 'http://www.imdb.com/title/tt4425200';

	request(url, function(error, response, html) {
		if(!error) {
			var $ = cheerio.load(html);
			var title;
			var release;
			var rating;
			
			var json = {
				title: "",
				release: "",
				rating: ""
			};

			$('.originalTitle').filter(function() {
				var data = $(this);
				title = data.children().first().text();
				
				json.title = title;
			});
		}
	});
});

app.listen('7000', function() {
	console.log('App listening on port 7000');
})