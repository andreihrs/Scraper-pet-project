const rp = require('request-promise');
const $ = require('cheerio')

const potusParse = function(url) {
rp(url)
  .then(res => {
    console.log($('.firstHeading', res).text());
    console.log($('.bday', res). text());
  })
  .catch(err => {
    //handle error
  })
}
  module.exports = potusParse;