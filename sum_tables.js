const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 38; seed <= 47; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    const numbers = await page.$$eval('td', tds =>
      tds.map(td => parseInt(td.innerText)).filter(n => !isNaN(n))
    );

    const tableSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} sum = ${tableSum}`);
    grandTotal += tableSum;
  }

  console.log("=================================");
  console.log("FINAL TOTAL =", grandTotal);
  console.log("=================================");

  await browser.close();
})();