const axios = require('axios')
const cheerio = require('cheerio')
const chalk = require('chalk')

const url = 'https://fanpagelist.com/category/brands/food/view/list/sort/fans/page2'

axios(url)
.then(response => {
  const html = response.data;
  const $ = cheerio.load(html);

  const nextPageLink = $('.nav_links').find('a').attr('href')
  console.log(nextPageLink)
  // console.log(chalk.cyan(`  Scraping: ${nextPageLink}`))

  // $('.ranking_results .ranking_results').map((i, el) => {
  //   const title = $(el).find('.listing_profile > a > span').text();
  //   const stats = $(el).find('.total_stats').text();
  //   const metadata = {
  //     title: title,
  //     stats: stats
  //   }
  //   console.log(title, stats)
  // })
  
  // liBrands.each(() => {
  //   console.log($(this).html())
  // });

})
.catch(console.error);