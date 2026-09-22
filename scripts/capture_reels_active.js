const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Scroll into reels active zone
  await page.evaluate(() => {
    const el = document.getElementById('reels');
    if (el) {
      const top = el.offsetTop + el.offsetHeight * 0.45;
      window.scrollTo(0, top);
    }
  });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'C:/Users/Jeevan Yadav/.gemini/antigravity/brain/8be386f1-36af-4b6c-8576-677778d52672/05b_reels_phone_active.png' });
  console.log('Captured 05b_reels_phone_active.png');
  await browser.close();
})();
