// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL of the page we want to scrape
const url = "https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3";

// Async function which scrapes the data
async function scrapeData() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    //console.log("---> Wikipedia Data: \n", data)
    
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);

    // Select all the list items in plainlist class
    const listItems = $(".plainlist ul li");
    
    // Stores data for all countries
    const countries = [];

    // Use .each method to loop through the li we selected
    listItems.each((idx, el) => {
      // Object holding data for each country/jurisdiction
//<li>
//<style data-mw-deduplicate="TemplateStyles:r886049734">.mw-parser-output .monospaced{font-family:monospace,monospace}</style>
//<span class="monospaced">ABW</span>
//&nbsp;&nbsp;<a href="/wiki/Aruba" title="Aruba">Aruba</a>
//</li>

      const country = { name: "", iso3: "", link: "" };
      // Select the text content of a and span elements
      // Store the textcontent in the above object
      country.name = $(el).children("a").text();
      country.link = "https://en.wikipedia.org"+ $(el).children("a").attr('href');
      country.iso3 = $(el).children("span").text();
     

      // Populate countries array with country data
      countries.push(country);
    });

    // Logs countries array to the console
    console.dir(countries);
    // // Write countries array in countries.json file
    fs.writeFile("coutries.json", JSON.stringify(countries, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });
  } catch (err) {
    console.error(err);
  }
}
// Invoke the above function
scrapeData();