const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Scroll to #reels active zone
  console.log('Scrolling to #reels active zone...');
  await page.evaluate(() => {
    const el = document.getElementById('reels');
    if (el) {
      const top = el.offsetTop + el.offsetHeight * 0.35;
      window.scrollTo(0, top);
    }
  });

  await new Promise(r => setTimeout(r, 2000));

  // Inspect the phone container and video elements
  const reelData = await page.evaluate(() => {
    const phone = document.querySelectorAll('#reels a[href*="instagram.com/reel"]');
    const videos = Array.from(document.querySelectorAll('#reels video')).map((v, i) => ({
      index: i,
      src: v.getAttribute('src'),
      paused: v.paused,
      currentTime: v.currentTime,
      readyState: v.readyState,
      muted: v.muted,
      loop: v.loop
    }));

    const activeText = document.querySelector('#reels span.text-saffron.font-medium')?.textContent;
    return {
      phoneCount: phone.length,
      videoCount: videos.length,
      activeText,
      videos
    };
  });

  console.log('Verification data:', JSON.stringify(reelData, null, 2));

  // Click dot 1 to guarantee slide 01 is active
  await page.evaluate(() => {
    const dots = document.querySelectorAll('#reels button[aria-label^="Go to Reel"]');
    if (dots[0]) dots[0].click();
  });
  await new Promise(r => setTimeout(r, 1500));
  const brainDir = 'C:\\Users\\Jeevan Yadav\\.gemini\\antigravity\\brain\\8be386f1-36af-4b6c-8576-677778d52672';
  await page.screenshot({ path: path.join(brainDir, 'reel_verify_slide_01.png') });
  console.log('Saved reel_verify_slide_01.png');

  // Click on dot 3 (neil_momo_reel_01)
  await page.evaluate(() => {
    const dots = document.querySelectorAll('#reels button[aria-label^="Go to Reel"]');
    if (dots[2]) dots[2].click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(brainDir, 'reel_verify_slide_03.png') });
  console.log('Saved reel_verify_slide_03.png');

  // Click on dot 5 (root_cause_reel_01)
  await page.evaluate(() => {
    const dots = document.querySelectorAll('#reels button[aria-label^="Go to Reel"]');
    if (dots[4]) dots[4].click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(brainDir, 'reel_verify_slide_05.png') });
  console.log('Saved reel_verify_slide_05.png');

  // Click on dot 8 (reel_general_01)
  await page.evaluate(() => {
    const dots = document.querySelectorAll('#reels button[aria-label^="Go to Reel"]');
    if (dots[7]) dots[7].click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(brainDir, 'reel_verify_slide_08.png') });
  console.log('Saved reel_verify_slide_08.png');

  // Click on dot 12 (reel_general_05)
  await page.evaluate(() => {
    const dots = document.querySelectorAll('#reels button[aria-label^="Go to Reel"]');
    if (dots[11]) dots[11].click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(brainDir, 'reel_verify_slide_12.png') });
  console.log('Saved reel_verify_slide_12.png');

  // Mobile viewport test
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  await page.evaluate(() => {
    const el = document.getElementById('reels');
    if (el) {
      const top = el.offsetTop + el.offsetHeight * 0.35;
      window.scrollTo(0, top);
    }
  });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(brainDir, 'reel_verify_mobile.png') });
  console.log('Saved reel_verify_mobile.png');

  console.log('Console Errors:', consoleErrors);
  await browser.close();
})();
