import puppeteer from 'puppeteer';
import path from 'path';

const outDir = 'C:\\Users\\Jeevan Yadav\\.gemini\\antigravity\\brain\\8be386f1-36af-4b6c-8576-677778d52672';

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // 1. Hero Initial Load (Static, Formed on Load, Nav says ANAGHA MHAISKAR, No duplicate HTML name)
  console.log('Capturing hero initial load...');
  // Place mouse far away first
  await page.mouse.move(100, 800);
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '01_hero.png') });

  // Get particle canvas bounding box to test localized hover
  const canvasRect = await page.evaluate(() => {
    const el = document.querySelector('[aria-label="Particle typography: ANAGHA MHAISKAR"]');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
  });

  if (canvasRect) {
    // 1b. Hover over 'ANAGHA' (left side of particle canvas)
    console.log('Capturing hover over ANAGHA...');
    const anaghaX = canvasRect.left + canvasRect.width * 0.25;
    const centerY = canvasRect.top + canvasRect.height * 0.5;
    await page.mouse.move(anaghaX, centerY, { steps: 5 });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(outDir, '01b_hero_hover_anagha.png') });

    // 1c. Hover over 'MHAISKAR' (right side of particle canvas)
    console.log('Capturing hover over MHAISKAR...');
    const mhaiskarX = canvasRect.left + canvasRect.width * 0.72;
    await page.mouse.move(mhaiskarX, centerY, { steps: 8 });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(outDir, '01c_hero_hover_mhaiskar.png') });

    // 1d. Move cursor away completely
    console.log('Capturing cursor leaving particle area...');
    await page.mouse.move(canvasRect.left + 50, canvasRect.top + canvasRect.height + 250, { steps: 5 });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outDir, '01d_hero_cursor_left.png') });
  }

  // 2. Scroll to About
  console.log('Capturing about...');
  await page.evaluate(() => document.getElementById('about')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '02_about.png') });

  // 3. Scroll to Capabilities
  console.log('Capturing capabilities...');
  await page.evaluate(() => document.getElementById('capabilities')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '03_capabilities.png') });

  // 4. Scroll to Tools
  console.log('Capturing tools...');
  await page.evaluate(() => document.getElementById('tools')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '04_tools.png') });

  // 4a. Scroll to Reels (Phone experience initial flashcards)
  console.log('Capturing reels flashcards stage...');
  await page.evaluate(() => document.getElementById('reels')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '05a_reels_flashcards.png') });

  // 4b. Scroll down into Reels (Phone rising and active screen)
  console.log('Capturing reels phone screen focused...');
  await page.evaluate(() => window.scrollBy(0, 900));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '05b_reels_phone_active.png') });

  // 5. Scroll to Work
  console.log('Capturing work...');
  await page.evaluate(() => document.getElementById('work')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '05_work.png') });

  // 6. Click first project card to open case study modal
  console.log('Opening case study modal...');
  const firstCard = await page.$('#work .group');
  if (firstCard) {
    await firstCard.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outDir, '06_case_study_modal.png') });
    // Close modal via ESC
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));
  }

  // 7. Scroll to Services
  console.log('Capturing services...');
  await page.evaluate(() => document.getElementById('services')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '07_services.png') });

  // 8. Scroll to Experience
  console.log('Capturing experience...');
  await page.evaluate(() => document.getElementById('experience')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '08_experience.png') });

  // 9. Scroll to Contact
  console.log('Capturing contact...');
  await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '09_contact.png') });

  // 10. Mobile test
  console.log('Capturing mobile view...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '10_mobile_hero.png') });

  await browser.close();
  console.log('All verification captures completed successfully!');
}

run().catch(console.error);
