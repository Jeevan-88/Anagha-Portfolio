const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 750, isMobile: true });
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1');
  try {
    await page.goto('https://www.instagram.com/reel/DdTwWyDRV2w/', { waitUntil: 'networkidle2', timeout: 15000 });
    await page.screenshot({ path: 'public/assets/projects/test_reel_1.jpg' });
    console.log('Captured test reel screenshot successfully!');
  } catch (e) {
    console.log('Error capturing reel:', e.message);
  } finally {
    await browser.close();
  }
})();
