import puppeteer from 'puppeteer';
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

  // test('click button add', async () => {
  //   await page.goto(baseURL);
  //   await page.waitForSelector('.widget-content');
  //   page.click('.add-item');
  //   await page.waitForSelector('.popup');
  // });

  // test('click button add-item to add new item', async () => {
  //   await page.goto(baseURL);
  //   await page.waitForSelector('.widget-content');
  //   page.click('.add-item');
  //   await page.waitForSelector('.popup');
  //   await page.evaluate('.input-name', inputName => inputName.value = 'Honor');
  //   await page.evaluate('.input-cost', inputCost => inputCost.value = '500000');
  //   page.click('.save');
  //   await page.waitForSelector('.row-data[data-name="Honor"]');
  // });

  // test('click button and appearence of a hint', async () => {
  //   await page.goto(baseURL);
  //   await page.waitForSelector('.button');
  //   page.click('.button');
  //   await page.waitForSelector('.hint-paragraph');
  // });

  // test('delete block hint', async () => {
  //   await page.goto(baseURL);
  //   await page.waitForSelector('.button');
  //   page.click('.button');
  //   await page.waitForSelector('.hint-paragraph');
  //   await page.click('body');
  //   await page.waitForTimeout(1000);

  //   expect(await page.$('.hint-paragraph')).toBeNull();
  // });
});
