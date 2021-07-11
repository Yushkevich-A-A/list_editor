import puppeteer, { ElementHandle } from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(90000);

describe('creating button, click button and appearence of a hint', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseURL = 'http://localhost:8888';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 100,
      // devTools: true,
    });

    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('creating widget', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.widget-content');
  });

  test('click button add', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.widget-content');
    await page.click('.add-item');
    await page.waitForSelector('.popup');
  });

  test('click button add-item to add new item', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.widget-content');
    await page.click('.add-item');
    await page.waitForSelector('.popup');
    await page.type('.input-name', 'Honor');
    await page.type('.input-cost', '500000');
    await page.click('.save');
    await page.waitForSelector('.row-data[data-name="honor"]');
  });

  test('click button add-item and input empty name', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.widget-content');
    await page.click('.add-item');
    await page.waitForSelector('.popup');
    await page.type('.input-name', '');
    await page.click('.save');
    await page.waitForSelector('.form-error');
    const error1 = await page.$('.form-error');
    const value1 = await page.evaluate((err) => err.innerText, error1);
    expect(value1).toBe('Поле не должно быть пустым');
  });

  test('click button add-item and input empty cost', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.widget-content');
    await page.click('.add-item');
    await page.waitForSelector('.popup');
    await page.type('.input-name', 'Honor');
    await page.type('.input-cost', '');
    await page.click('.save');
    await page.waitForSelector('.form-error');
    const error1 = await page.$('.form-error');
    const value1 = await page.evaluate((err) => err.innerText, error1);
    expect(value1).toBe('Поле не должно быть пустым');
  });

  test('click button add-item and input 0', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.widget-content');
    await page.click('.add-item');
    await page.waitForSelector('.popup');
    await page.type('.input-name', 'Honor');
    await page.type('.input-cost', '0');
    await page.click('.save');
    await page.waitForSelector('.form-error');
    const error1 = await page.$('.form-error');
    const value1 = await page.evaluate((err) => err.innerText, error1);
    expect(value1).toBe('Введите число больше 0');
  });

  test('click button add-item and input  > 5 000 000 000', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.widget-content');
    await page.click('.add-item');
    await page.waitForSelector('.popup');
    await page.type('.input-name', 'Honor');
    await page.type('.input-cost', '50000000000');
    await page.click('.save');
    await page.waitForSelector('.form-error');
    const error1 = await page.$('.form-error');
    const value1 = await page.evaluate((err) => err.innerText, error1);
    expect(value1).toBe('Не вводите космические числа');
  });

  test('click button detete item, waiting confirm window', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.widget-content');
    await page.click('.add-item');
    await page.waitForSelector('.popup');
    await page.type('.input-name', 'Honor');
    await page.type('.input-cost', '50000');
    await page.click('.save');

    const arrElement = await page.$('.row-data[data-name="honor"]');
    const button = await arrElement.$('.delete-item');
    await button.click();

    await page.waitForSelector('.window-confirm');
  });

  test('click button detete item, waiting confirm window and delete item', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.widget-content');
    await page.click('.add-item');
    await page.waitForSelector('.popup');
    await page.type('.input-name', 'Honor');
    await page.type('.input-cost', '50000');
    await page.click('.save');

    const arrElement = await page.$('.row-data[data-name="honor"]');
    const button = await arrElement.$('.delete-item');
    await button.click();
    const confirmDelete = await page.$('.button-conf');
    await confirmDelete.click();
    await page.waitForSelector('.window-confirm', { hidden: true });
    await page.waitForSelector('.row-data[data-name="honor"]', { hidden: true });
  });

  test('click button detete item, waiting confirm window and not delete item', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.widget-content');
    await page.click('.add-item');
    await page.waitForSelector('.popup');
    await page.type('.input-name', 'Honor');
    await page.type('.input-cost', '50000');
    await page.click('.save');

    const arrElement = await page.$('.row-data[data-name="honor"]');
    const button = await arrElement.$('.delete-item');
    await button.click();
    const confirmDelete = await page.$('.button-canc');
    await confirmDelete.click();
    await page.waitForSelector('.window-confirm', { hidden: true });
    await page.waitForSelector('.row-data[data-name="honor"]');
  });

  test('click button edit', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.widget-content');
    await page.click('.add-item');
    await page.waitForSelector('.popup');
    await page.type('.input-name', 'Honor');
    await page.type('.input-cost', '50000');
    await page.click('.save');
    await page.waitForSelector('.row-data[data-name="honor"]');

    const arrElement = await page.$('.row-data[data-name="honor"]');
    const button = await arrElement.$('.edit-item');
    await button.click();
    await page.waitForSelector('.popup');
  });

  test('click button edit and element edition item with saving', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.widget-content');
    await page.click('.add-item');
    await page.waitForSelector('.popup');
    await page.type('.input-name', 'Honor');
    await page.type('.input-cost', '50000');
    await page.click('.save');
    await page.waitForSelector('.row-data[data-name="honor"]');

    const arrElement = await page.$('.row-data[data-name="honor"]');
    const button = await arrElement.$('.edit-item');
    await button.click();
    await page.waitForSelector('.popup');
    await page.type('.input-name', '5');
    await page.click('.save');
    await page.waitForSelector('.window-confirm', { hidden: true });
    await page.waitForSelector('.row-data[data-name="honor"]', { hidden: true });
    await page.waitForSelector('.row-data[data-name="honor5"]');
  });

  test('click button edit and element edition item without saving', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.widget-content');
    await page.click('.add-item');
    await page.waitForSelector('.popup');
    await page.type('.input-name', 'Honor');
    await page.type('.input-cost', '50000');
    await page.click('.save');
    await page.waitForSelector('.row-data[data-name="honor"]');

    const arrElement = await page.$('.row-data[data-name="honor"]');
    const button = await arrElement.$('.edit-item');
    await button.click();
    await page.waitForSelector('.popup');
    await page.type('.input-name', '5');
    await page.click('.cancel');
    await page.waitForSelector('.window-confirm', { hidden: true });
    await page.waitForSelector('.row-data[data-name="honor"]');
    await page.waitForSelector('.row-data[data-name="honor5"]', { hidden: true });
  });
});
