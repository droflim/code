const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome', // Ruta al ejecutable de Google Chrome
      headless: false, // Establecer a false para ver el navegador
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    const url = 'https://html5-chat.com/chat/48967/65cace86434d3/pedro';

    console.log(`Navegando a ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2' });

    console.log('Página cargada.');
    
    // Captura de pantalla para ver qué está pasando
    await page.screenshot({ path: 'screenshot.png' });

    // Imprimir el título de la página para verificar que se ha cargado
    const title = await page.title();
    console.log(`Título de la página: ${title}`);

    // Mantener la página abierta para depuración
    await new Promise(resolve => setTimeout(resolve, 60000)); // Esperar 1 minuto

    await browser.close();
  } catch (error) {
    console.error('Error al navegar:', error.message);
  }
})();
