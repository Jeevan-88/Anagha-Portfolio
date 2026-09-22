const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  const info = await page.evaluate(() => {
    // Check if Three objects exist or inspect via window
    return {
      title: document.title
    };
  });
  console.log(info);
  await browser.close();
})();
