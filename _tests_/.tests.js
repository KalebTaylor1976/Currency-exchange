import from "../src/";

describe('Test form', () => {
  let fromCurrency;
  let fromAmount;
  let toCurrency;
  let toAmount;

  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <input id="from-currency" type="text" />
        <input id="from-amount" type="text" />
        <input id="to-currency" type="text" />
        <input id="to-amount" type="text" />
      </form>
    `;
    fromCurrency = document.getElementById('from-currency');
    fromAmount = document.getElementById('from-amount');
    toCurrency = document.getElementById('to-currency');
    toAmount = document.getElementById('to-amount');
  });

  it('should fetch exchange rate and convert currency', async () => {
    const exchangeRate = 1.2;
    const response = { rates: { EUR: exchangeRate } };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });

    fromCurrency.value = 'USD';
    fromAmount.value = '100';
    toCurrency.value = 'EUR';

    const event = new Event('submit');
    document.querySelector('form').dispatchEvent(event);

    await Promise.resolve();

    expect(global.fetch).toHaveBeenCalledWith(
      'https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD'
    );
    expect(toAmount.value).toBe((fromAmount.value * exchangeRate).toFixed(2));
  });
});
```
