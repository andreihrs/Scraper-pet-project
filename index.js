  
// External dependencies
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const chalk = require('chalk')

const url = 'https://fanpagelist.com/category/brands/food/view/list/sort/fans/page2'
const outputFile = 'data.json'
const parsedResults = []
const pageLimit = 5
let pageCounter = 0
let resultCount = 0
let delayInMs = Math.floor(Math.random() * 5000) + 3000;

console.log(chalk.yellow.bgBlue(`\n  Scraping of ${chalk.underline.bold(url)} initiated...\n`))

// async function delay(delayInms) {
//   return new Promise(resolve  => {
//     setTimeout(() => {
//       resolve(2);
//     }, delayInms);
//   });
// }

const getWebsiteContent = async (url) => {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    // New Lists
    $('.ranking_results .ranking_results').map((i, el) => {
      const count = resultCount++
      const title = $(el).find('.listing_profile > a > span').text();
      const stats = $(el).find('.total_stats').text();
      const metadata = {
        title: title,
        stats: stats
      }
      parsedResults.push(metadata)
    })

    // Pagination Elements Link
    const nextPageLink = $('.nav_links').find('a').attr('href')
    console.log(chalk.cyan(`  Scraping: ${nextPageLink}`))
    pageCounter++

    if (pageCounter === pageLimit) {
      exportResults(parsedResults)
      return false
    }

    // let delayres = await delay(delayInMs);

    getWebsiteContent(nextPageLink);
  } catch (error) {
    exportResults(parsedResults)
    console.error(error)
  }
}

const exportResults = (parsedResults) => {
  fs.writeFile(outputFile, JSON.stringify(parsedResults, null, 4), (err) => {
    if (err) {
      console.log(err)
    }
    console.log(chalk.yellow.bgBlue(`\n ${chalk.underline.bold(parsedResults.length)} Results exported successfully to ${chalk.underline.bold(outputFile)}\n`))
  })
}

getWebsiteContent(url)