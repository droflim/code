const puppeteer = require('puppeteer');

(async () => {
  // Ruta al ejecutable de Google Chrome
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome', // Cambia esta ruta si es necesario
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://html5-chat.com/chat/48967/65cace86434d3/pedro');
  
  console.log('Página cargada.');

  // Realizar alguna acción o captura de pantalla
  await page.screenshot({ path: 'screenshot.png' });

  await browser.close();
})();
