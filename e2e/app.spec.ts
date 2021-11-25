import 'expect-puppeteer';

describe('Game of Life', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8081');
  });

  it('should load without error', async () => {
    const text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain('Start');
  });

  it('should login and logout user', async () => {
    let text;

    await expect(page).toClick('button', { text: 'Start' });
    text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain('Start');

    await page.type('input', 'Andrey');
    await expect(page).toClick('button', { text: 'Start' });

    text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain('Hello, Andrey!');

    await expect(page).toClick('span', { text: 'Logout' });

    text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain('Start');
  });
});
