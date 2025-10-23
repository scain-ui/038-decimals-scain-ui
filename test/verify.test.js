const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it('should assign a variable lengthInFeet to 1.5', async function() {
    const lengthInFeet = await page.evaluate(() => lengthInFeet);
    expect(lengthInFeet).toBe(1.5);
  });

  it('should assign a variable pricePerFoot to 2.50', async function() {
    const pricePerFoot = await page.evaluate(() => pricePerFoot);
    expect(pricePerFoot).toBe(2.50);
  });

  it('should capture the product of lengthInFeet and pricePerFoot multiplied together in a variable named totalPrice', async function() {
    const totalPrice = await page.evaluate(() => totalPrice);
    expect(totalPrice).toBe(3.75);
  });

  it('should assign the innerHTML of the HTML element with the id result to the totalPrice', async function() {
    const innerHtml = await page.$eval("#result", (result) => {
      return result.innerHTML;
    });
      
    expect(innerHtml).toBe('3.75');
  });
});
