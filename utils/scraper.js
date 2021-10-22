const puppeteer = require('puppeteer');

(async () => {

    var urlAddress = 'https://www.youtube.com/feed/trending';

    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 100,
        // open dev tools 
        //devtools: true
    });

    const page = await browser.newPage(urlAddress);

    console.log("-- > Loaded : " + urlAddress);

    await page.goto(urlAddress);

    // Wait for the required DOM to be rendered
    await page.waitForSelector('#video-title');

    await page.screenshot({
        // fullPage: false,
        path: `../screenshots/${new Date().toUTCString()}.png`
    });

    //console.log(" = = = > THIS IS THE TEDNING PG: \n", page)

    let urls = await page.evaluate(() => {

        let results = [];

        let items = document.querySelectorAll('#video-title');

        items.forEach((item) => {

            var url = "https://www.youtube.com" + item.getAttribute('href');
            var text = item.innerText;
            //video thumbnail url = https://i.ytimg.com/vi/<video id>/hqdefault.jpg
            var videoId = url.replace("https://www.youtube.com/watch?v=", "");
            var thumbUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`


            if (text.length > 5 && url.length > 5) {
                results.push({
                    url: url,
                    text: text, 
                    thumbUrl: thumbUrl
                });
            }
        });

        return results;
    })


    //console.log(" ++++ Scraped Links: " + JSON.stringify(urls, null, 3));
    console.log("TOP TRENDING: "+ JSON.stringify(urls[0]))
    console.table(urls)

    await browser.close();

})();

