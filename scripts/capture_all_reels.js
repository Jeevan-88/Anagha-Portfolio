const puppeteer = require('puppeteer');

const reels = [
  { id: 'reel_1', url: 'https://www.instagram.com/reel/DdTwWyDRV2w/' },
  { id: 'reel_2', url: 'https://www.instagram.com/reel/DZhw25nN4hQ/' },
  { id: 'reel_3', url: 'https://www.instagram.com/reel/DcF2AixtitB/' },
  { id: 'reel_4', url: 'https://www.instagram.com/reel/Dap3idQTkou/' },
  { id: 'reel_5', url: 'https://www.instagram.com/reel/C-kh-Soobid/' },
  { id: 'ana_reel_1', url: 'https://www.instagram.com/reel/DaVKQIkR0aL/' },
  { id: 'ana_reel_2', url: 'https://www.instagram.com/reel/DartbBVM6kW/' },
  { id: 'rc_reel_1', url: 'https://www.instagram.com/reel/DbnkDyuIRg9/' },
  { id: 'rc_reel_2', url: 'https://www.instagram.com/reel/DU8J2Q2iNEm/' },
  { id: 'rc_reel_3', url: 'https://www.instagram.com/reel/DUx7xVIiFcy/' },
  { id: 'nm_strat_1', url: 'https://www.instagram.com/reel/DaXvmAgNZ_d/' },
  { id: 'nm_strat_2', url: 'https://www.instagram.com/reel/DHI9Ax1NNDZ/' }
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const item of reels) {
    const page = await browser.newPage();
    await page.setViewport({ width: 450, height: 800, isMobile: true });
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1');
    try {
      await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 12000 });
      // wait a moment for any image to paint
      await new Promise(r => setTimeout(r, 1500));
      await page.screenshot({ path: `public/assets/projects/${item.id}.jpg` });
      console.log(`Captured ${item.id}`);
    } catch (e) {
      console.log(`Error ${item.id}:`, e.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
})();
