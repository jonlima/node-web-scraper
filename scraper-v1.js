// Gets some general movie information from IMDB

"use strict";

var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();

app.get('/scrape', function(req, res){
	var url = 'http://www.imdb.com/title/tt1229340';

	request(url, function(error, response, html) {
		if(!error) {
			var $ = cheerio.load(html);
			var title;
			var release;
			var rating;
			
			var json = {
				title: "",
				release: ""
			};

			$('.title_wrapper').filter(function() {
				var data = $(this);
				title = data.children().first().text();
				release = data.children().first().find('span#titleYear').text();
				title = title.replace(release, "");

				json.title = title.trim();
				json.release = release;
			});
		}

		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
			console.log('File successfully written !');
		});

		res.send('Check your console !');
	});
});

app.listen('7000', function() {
	console.log('App listening on port 7000');
})