const puppeteer = require('puppeteer');

const femaleNicks = [
  'maria', 'ana', 'luisa', 'carla', 'rosa', 'lina', 'sandra', 'sofia', 'carmen',
  'valeria', 'veronica', 'natalia', 'isabella', 'paola', 'camila', 'elena', 'claudia',
  'silvia', 'andrea', 'ana-maria', 'jessica', 'valentina', 'ana-silvia', 'johana',
  'paulina', 'regina', 'gabriela', 'mariana', 'lucrecia', 'laura', 'eliana', 'renata',
  'juliana', 'adriana', 'monica', 'ximena', 'diana', 'constanza', 'rosalia', 'pilar',
  'olga', 'margarita', 'tania', 'viviana', 'celeste', 'nadia', 'alba', 'yolanda',
  'verona', 'belen', 'carolina', 'ines', 'julia', 'angela', 'vicky', 'ariana',
  'betty', 'soledad', 'irma'
];

const BASE_URL = 'https://html5-chat.com/chat/48967/65cace86434d3/';

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome', // Ruta al ejecutable de Google Chrome
      headless: true, // Ejecutar en modo headless
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--remote-debugging-port=9222',
        '--disable-infobars',
        '--disable-dev-shm-usage'
      ]
    });

    const pages = await Promise.all(femaleNicks.map(async (nick) => {
      const page = await browser.newPage();
      const url = `${BASE_URL}${nick}/mujer`;

      console.log(`Navegando a ${url}`);
      
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }); // Aumentar el tiempo de espera a 60 segundos

        console.log(`Página cargada para el nick: ${nick}`);
        
        // Captura de pantalla para verificar el estado inicial
        await page.screenshot({ path: `screenshot_${nick}.png` });

        // Imprimir el título de la página para verificar que se ha cargado
        const title = await page.title();
        console.log(`Título de la página para el nick ${nick}: ${title}`);

        // Función para mantener la actividad en la página
        const keepPageActive = async () => {
          while (true) {
            try {
              // Simular desplazamiento para mantener la conexión
              await page.evaluate(() => window.scrollBy(0, 1));
              
              // Esperar un intervalo antes de la próxima acción
              await new Promise(resolve => setTimeout(resolve, 30000)); // Esperar 30 segundos
            } catch (error) {
              console.error(`Error al mantener la actividad para el nick ${nick}:`, error.message);
            }
          }
        };

        // Llamar a la función para mantener la actividad en la página
        keepPageActive();

      } catch (error) {
        console.error(`Error al cargar la página para el nick ${nick}:`, error.message);
      }

      return page;
    }));

    console.log('Todas las páginas están ahora abiertas y activas.');

    // Mantener el navegador abierto indefinidamente
    // Esperar indefinidamente para que las instancias sigan activas
    await new Promise(resolve => {}); 

  } catch (error) {
    console.error('Error al conectar con los nicks:', error.message);
  }
})();
