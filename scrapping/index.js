const puppeteer = require('puppeteer'); 

async function run(username) {

    const browser = await puppeteer.launch( {
        headless: false  //change to true in prod!
    }); 

    const page = await browser.newPage(); 

    await page.goto(`https://torre.bio/api/bios/${username}`);

    await page.content(); 

    try {
        innerText = await page.evaluate(() =>  {
            return JSON.parse(document.querySelector("body").innerText); 
        });
        const rta = {
            name: innerText.person.name,
            picture: innerText.person.pictureThumbnail,
            username: innerText.person.publicId,
            location: innerText.person.location.shortName,
            weight: innerText.person.weight,
            stats: innerText.stats
        }
        
        await browser.close();
        return rta;
    } catch (error) {
        await browser.close();
        return error.message;
    }
};

module.exports = {
    run
}