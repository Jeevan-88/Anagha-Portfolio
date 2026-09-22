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
  await new Promise(r => setTimeout(r, 2000));

  // 1. Hero
  await page.screenshot({ path: 'C:/Users/Jeevan Yadav/.gemini/antigravity/brain/8be386f1-36af-4b6c-8576-677778d52672/01_hero_ana.png' });

  // 2. About
  await page.evaluate(() => document.getElementById('about')?.scrollIntoView({ behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'C:/Users/Jeevan Yadav/.gemini/antigravity/brain/8be386f1-36af-4b6c-8576-677778d52672/02_about_ana.png' });

  // 3. Brands
  await page.evaluate(() => document.getElementById('brands')?.scrollIntoView({ behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'C:/Users/Jeevan Yadav/.gemini/antigravity/brain/8be386f1-36af-4b6c-8576-677778d52672/03_brands_index.png' });

  // 4. Case Studies
  await page.evaluate(() => document.getElementById('case-studies')?.scrollIntoView({ behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'C:/Users/Jeevan Yadav/.gemini/antigravity/brain/8be386f1-36af-4b6c-8576-677778d52672/04_case_studies.png' });

  // 5. Reels
  await page.evaluate(() => document.getElementById('reels')?.scrollIntoView({ behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'C:/Users/Jeevan Yadav/.gemini/antigravity/brain/8be386f1-36af-4b6c-8576-677778d52672/05_reels_phone.png' });

  // 6. Content Strategy
  await page.evaluate(() => document.getElementById('content-strategy')?.scrollIntoView({ behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'C:/Users/Jeevan Yadav/.gemini/antigravity/brain/8be386f1-36af-4b6c-8576-677778d52672/06_content_strategy.png' });

  // 7. Video Editing
  await page.evaluate(() => document.getElementById('video-editing')?.scrollIntoView({ behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'C:/Users/Jeevan Yadav/.gemini/antigravity/brain/8be386f1-36af-4b6c-8576-677778d52672/07_video_editing.png' });

  // 8. Laptop Walkthrough
  await page.evaluate(() => document.getElementById('laptop-experience')?.scrollIntoView({ behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'C:/Users/Jeevan Yadav/.gemini/antigravity/brain/8be386f1-36af-4b6c-8576-677778d52672/08_laptop_walkthrough.png' });

  // 9. Capabilities & Tools
  await page.evaluate(() => document.getElementById('capabilities')?.scrollIntoView({ behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'C:/Users/Jeevan Yadav/.gemini/antigravity/brain/8be386f1-36af-4b6c-8576-677778d52672/09_capabilities.png' });

  // 10. Services & Experience
  await page.evaluate(() => document.getElementById('services')?.scrollIntoView({ behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'C:/Users/Jeevan Yadav/.gemini/antigravity/brain/8be386f1-36af-4b6c-8576-677778d52672/10_services.png' });

  console.log('All verification screenshots captured!');
  await browser.close();
})();
