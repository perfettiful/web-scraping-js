// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL of the page we want to scrape
const url =
  "https://boston.r.mikatiming.com/2021/?content=detail&fpid=list&pid=list&idp=9TGHS6FF145C88&lang=EN_CAP&event=R&event_main_group=runner&pidp=start&search_event=R";

// Async function which scrapes the data
async function scrapeData(urlToScrape) {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(urlToScrape);
    //console.log("---> Wikipedia Data: \n", data)

    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);

    let splitsList = {
      "5K": "",
      "10K": "",
      "15K": "",
      "20K": "",
      HALF: "",
      "25K": "",
      "30K": "",
      "20 Miles": "",
      "21 Miles": "",
      "35K": "",
      "40K": "",
      "25.2 Miles": "",
      "Finish Net": "",
    };

    const splitsTable = $(".table-striped tbody tr");

    splitsTable.each((idx, el) => {
      console.log(" ===> TR index: " + idx);

      //console.log($(el).children("th").text());

      let rowName = $(el).children("th").text();

      let splitsData = {
        "Time Of Day": "",
        Time: "",
        Diff: "",
        "Min/mile": "",
        "Miles/h": "",
      };

      $(el)
        .children("td")
        .each((index, cell) => {
          
          switch (index) {
            case 0:
              splitsData["Time Of Day"] = cell.children[0].data;
              break;
            case 1:
              splitsData["Time"] = cell.children[0].data;
              break;
            case 2:
              splitsData["Diff"] = cell.children[0].data;
              break;
            case 3:
              splitsData["Min/mile"] = cell.children[0].data;
              break;
            case 4:
              splitsData["Miles/h"] = parseFloat(cell.children[0].data);
              break;
            default:
              break;
          }
          // console.log(index);
          // console.log(cell.children[0].data);
        }); //end inner loop

      switch (idx) {
        case 0:
          console.log("+++ Add Row #:",idx)
          splitsList["5K"] = splitsData;
          break;
        case 1:
          console.log("+++ Add Row #:",idx)
          splitsList["10K"] = splitsData;
          break;
        case 2:
          console.log("+++ Add Row #:",idx)
          splitsList["15K"] = splitsData;
          break;
        case 3:
          console.log("+++ Add Row #:",idx)
          splitsList["20K"] = splitsData;
          break;
        case 4:
          console.log("+++ Add Row #:",idx)
          splitsList["HALF"] = splitsData;
          break;
        case 5:
          splitsList["25K"] = splitsData;
          break;
        case 6:
          splitsList["30K"] = splitsData;
          break;
        case 7:
          splitsList["20 Miles"] = splitsData;
          break;
        case 8:
          splitsList["21 Miles"] = splitsData;
          break;
        case 9:
          splitsList["35K"] = splitsData;
          break;
        case 10:
          splitsList["40K"] = splitsData;
        case 11:
          splitsList["25.2 Miles"] = splitsData;
          break;
        case 12:
          splitsList["Finish Net"] = splitsData;
          break;
        default:
          break;
      }
    }); //end out loop

    // // Write table array in countries.json file
    fs.writeFile("splits.json", JSON.stringify(splitsList), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });//end file write

  } catch (err) {
    console.error(err);
  }
}

// Invoke the above function
scrapeData(url);
