import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // Ejecutar en modo headless
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://html5-chat.com/chat/48967/65cace86434d3/pedrorock');
  
  // Hacer algo con la página, como tomar una captura de pantalla
  await page.screenshot({ path: 'screenshot.png' });

  await browser.close();
})();
