const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });
  const page = await browser.newPage();
  page.on('requestfailed', req => console.log('FAILED REQUEST:', req.url(), req.failure().errorText));
  page.on('response', res => {
    if (res.status() >= 400) console.log('HTTP', res.status(), res.url());
  });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await browser.close();
})();
