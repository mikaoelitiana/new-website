import expect from 'expect';

import { appUrlBase, getBrowser, mainNavigationSelectors } from '../utils';

let browser;
let page;

beforeAll(async () => {
    browser = await getBrowser();
    page = await browser.newPage();
    await page.goto(appUrlBase);
    await page.click(mainNavigationSelectors.home);
    await page.waitForSelector('#homeContent');
});

describe('home page', () => {
    test('it should display Welcome', async () => {
        const hello = await page.evaluate(
            () => document.querySelector('.welcome').textContent,
        );
        expect(hello).toContain('Welcome to our new website.');
    });

    test('it should last talk', async () => {
        const lastTalk = await page.evaluate(
            () => document.querySelector('.lasttalk').textContent,
        );
        expect(lastTalk).toContain('Dernier talk');
    });
});

afterAll(() => {
    if (!process.env.DEBUG) {
        browser.close();
    }
});
