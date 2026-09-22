import puppeteer from 'puppeteer';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/Jeevan Yadav/.gemini/antigravity/brain/8be386f1-36af-4b6c-8576-677778d52672';

async function capture() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 35000 });
  await new Promise(r => setTimeout(r, 2000));

  // 1. Hero with First-Person Copy & Masthead
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '01_hero_first_person.png') });
  console.log('1. Captured 01_hero_first_person.png');

  // 2. About section
  await page.evaluate(() => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '02_about_first_person.png') });
  console.log('2. Captured 02_about_first_person.png');

  // 3. Brands & Clients section
  await page.evaluate(() => {
    const el = document.getElementById('brands');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '03_brands_visual_archive.png') });
  console.log('3. Captured 03_brands_visual_archive.png');

  // 4. Case Studies: Neil & Momo (scroll down slightly)
  await page.evaluate(() => {
    const el = document.getElementById('case-studies');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '04_case_studies_neil_momo.png') });
  console.log('4. Captured 04_case_studies_neil_momo.png');

  // 5. Case Studies: Tripster Studio
  await page.evaluate(() => {
    const el = document.getElementById('case-studies');
    if (el) window.scrollBy(0, 1100);
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '05_case_studies_tripster.png') });
  console.log('5. Captured 05_case_studies_tripster.png');

  // 6. Dedicated Video Reels Feed (Phone Experience)
  await page.evaluate(() => {
    const el = document.getElementById('reels');
    if (el) {
      const top = el.offsetTop + 400;
      window.scrollTo(0, top);
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '06_reels_phone_experience.png') });
  console.log('6. Captured 06_reels_phone_experience.png');

  // 7. Capabilities: What I Bring to the Table
  await page.evaluate(() => {
    const el = document.getElementById('capabilities');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '07_capabilities_approach.png') });
  console.log('7. Captured 07_capabilities_approach.png');

  // 8. Laptop 3D Studio (Tools)
  await page.evaluate(() => {
    const el = document.getElementById('laptop-experience');
    if (el) {
      const top = el.offsetTop + 1200;
      window.scrollTo(0, top);
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '08_laptop_studio.png') });
  console.log('8. Captured 08_laptop_studio.png');

  // 9. Services Menu
  await page.evaluate(() => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '09_services_menu.png') });
  console.log('9. Captured 09_services_menu.png');

  // 10. Experience & Education
  await page.evaluate(() => {
    const el = document.getElementById('experience');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '10_experience_education.png') });
  console.log('10. Captured 10_experience_education.png');

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Error capturing:', err);
  process.exit(1);
});
