const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://html5-chat.com/chat/48967/65cace86434d3/pedro', { waitUntil: 'networkidle2' });
  
  // Tomar una captura de pantalla de la página
  await page.screenshot({ path: 'screenshot.png' });
  
  // Obtener el título de la página
  console.log('Page title:', await page.title());

  // Cerrar el navegador
  await browser.close();
})();
