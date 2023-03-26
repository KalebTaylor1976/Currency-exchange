// Get input elements
const fromCurrency = document.getElementById('from-currency');
const fromAmount = document.getElementById('from-amount');
const toCurrency = document.getElementById('to-currency');
const toAmount = document.getElementById('to-amount');

// Add event listener to the form
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the form from submitting

  // Get the exchange rate from an API (in this example, using exchangerate-api.com)
  const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const exchangeRate = data.rates[toCurrency.value];

      // Convert the currency and display the result
      toAmount.value = (fromAmount.value * exchangeRate).toFixed(2);
    })
    .catch(error => console.error(error));
});