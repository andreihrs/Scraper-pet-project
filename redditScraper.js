const puppeteer = require('puppeteer');
const url = 'https://www.reddit.com';
const $ = require('cheerio'); 
// var http = require('http');
// var fs = require('fs');
//var server = http.createServer(function (req, resp) {
puppeteer
  .launch()
  .then(browser => {
    //success!
    return browser.newPage();
    // resp.writeHead(200, { 'Content-type': 'text/html' });
    // resp.write(res);
    // resp.end();
  })
  .then(page => {
    page.goto(url).then(() => {
      return page.content();
    });
  })
  .then(function(html) {
    $('h2', html).each(function() {
    console.log($(this).text());
    });
  })
  .catch(err => {
    //handle error
  });
//});

// server.listen(5050);

// console.log('Server Started listening on 5050');