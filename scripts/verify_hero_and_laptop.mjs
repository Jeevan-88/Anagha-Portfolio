import puppeteer from 'puppeteer';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/Jeevan Yadav/.gemini/antigravity/brain/8be386f1-36af-4b6c-8576-677778d52672';

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });

  // 1. Hero Intact
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '01_hero_masthead_intact.png') });
  console.log('Saved 01_hero_masthead_intact.png');

  // 2. Fisheye Lens Hover over MHAISKAR (center-right of masthead canvas)
  const canvases = await page.$$('canvas');
  if (canvases.length > 0) {
    const box = await canvases[0].boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width * 0.72, box.y + box.height * 0.5);
      await new Promise(r => setTimeout(r, 400));
      await page.screenshot({ path: path.join(ARTIFACT_DIR, '02_hero_fisheye_hover.png') });
      console.log('Saved 02_hero_fisheye_hover.png');
    }
  }

  // 3. Scroll Phase 1: Separation
  await page.evaluate(() => window.scrollTo(0, 240));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '03_scroll_dispersion_p1.png') });
  console.log('Saved 03_scroll_dispersion_p1.png');

  // 4. Scroll Phase 2: Vertical Dotted Lines
  await page.evaluate(() => window.scrollTo(0, 520));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '04_scroll_dispersion_p2.png') });
  console.log('Saved 04_scroll_dispersion_p2.png');

  // 5. Scroll Phase 3: Ink Splatter into About + Nav Logo Fade-in
  await page.evaluate(() => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '05_scroll_dispersion_p3_about.png') });
  console.log('Saved 05_scroll_dispersion_p3_about.png');

  // 6. Laptop Experience Section
  const laptopOffset = await page.evaluate(() => {
    const el = document.getElementById('laptop-experience');
    return el ? el.offsetTop : 0;
  });
  console.log('Laptop offsetTop:', laptopOffset);

  // 6a. Studio Spotlight entrance
  await page.evaluate((top) => window.scrollTo(0, top + 250), laptopOffset);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '06_laptop_studio_spotlight.png') });
  console.log('Saved 06_laptop_studio_spotlight.png');

  // 6b. Lid Opening in 3D
  await page.evaluate((top) => window.scrollTo(0, top + 950), laptopOffset);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '07_laptop_lid_opening.png') });
  console.log('Saved 07_laptop_lid_opening.png');

  // 6c. Screen Illuminated with Adobe Illustrator & packaging die-lines
  await page.evaluate((top) => window.scrollTo(0, top + 1300), laptopOffset);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '08_laptop_screen_illustrator.png') });
  console.log('Saved 08_laptop_screen_illustrator.png');

  // 6d. Switch to After Effects
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent && b.textContent.includes('After'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '09_laptop_screen_after_effects.png') });
  console.log('Saved 09_laptop_screen_after_effects.png');

  // 6e. Switch to Photoshop
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent && b.textContent.includes('Photoshop'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '10_laptop_screen_photoshop.png') });
  console.log('Saved 10_laptop_screen_photoshop.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});