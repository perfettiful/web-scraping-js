// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// Async function which scrapes the data
async function scrapeResults() {
  try {

    // Load HTML we fetched in the previous line
    const $ = cheerio.load(fs.readFileSync('./splitsResults0-1000.html'));

    let runnerList = [];

    const listItems = $("ul.list-group-multicolumn li.row .col-md-5 .row h4 a");

    listItems.each((idx, el) => {

      const runner = { name: "", link: "" };

      runner.name = $(el).text();
      runner.link = "https://boston.r.mikatiming.com/2021/"+ $(el).attr('href');

      // Populate countries array with country data
      runnerList.push(runner);
    });
    console.table(runnerList)


    // // // Write table array in countries.json file
    // fs.writeFile("splits.json", JSON.stringify(splitsList), (err) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   console.log("Successfully written data to file");
    // });//end file write

  } catch (err) {
    console.error(err);
  }
}

scrapeResults();
