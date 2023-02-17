const API_URL = 'https://api.coingecko.com/api/v3/exchange_rates';
const IMAGE_API_URL = 'https://assets.coincap.io/assets/icons';

const cryptoList = document.getElementById('crypto-list');
const loadingIndicator = document.getElementById('loading-indicator');
const endNotification = document.getElementById('end-notification');

let start = 1;
let limit = 20;
let total = 0;

function displayCryptoRates() {
  loadingIndicator.classList.remove('hidden');
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      total = Object.keys(data.rates).length;
      const rates = Object.entries(data.rates).slice(start, start + limit);
      start += limit;
      console.log(data)
      if (rates.length === 0) {
        endNotification.classList.remove('hidden');
      }
      rates.forEach((rate) => {
        console.log(rate);
        const [name, info] = rate;
        const { unit, value } = info;
        const listItem = document.createElement('div');
        listItem.classList.add('row', 'crypto-item');

        // First column
        const imageColumn = document.createElement('div');
        imageColumn.classList.add('col-2', 'text-center');
        const symbol = name.toLowerCase();
        const image = document.createElement('img');
        image.src = `${IMAGE_API_URL}/${symbol}@2x.png`;
        image.classList.add('img-fluid');
        image.setAttribute("onerror", "'this.onerror=null';this.src='./no-img.png';");
        console.log(image.src);
        imageColumn.appendChild(image);
        listItem.appendChild(imageColumn);

        // Second column
        const infoColumn = document.createElement('div');
        infoColumn.classList.add('col-10');
        
        const rateRow = document.createElement('div');
        rateRow.classList.add('row');
        const rateLabel = document.createElement('div');
        rateLabel.classList.add('col-4', 'rate', 'label');
        rateLabel.innerText = 'Rate: ';
        const rateValue = document.createElement('div');
        rateValue.classList.add('col-8', 'rate');
        rateValue.innerText = parseFloat(value).toLocaleString(undefined, { maximumFractionDigits: 2 });
        rateRow.appendChild(rateLabel);
        rateRow.appendChild(rateValue);
        infoColumn.appendChild(rateRow);
        
        const nameRow = document.createElement('div');
        nameRow.classList.add('row');
        const nameLabel = document.createElement('div');
        nameLabel.classList.add('col-4', 'name', 'label');
        nameLabel.innerText = 'Currency Name: ';
        const nameValue = document.createElement('div');
        nameValue.classList.add('col-8', 'name');
        nameValue.innerText = info.name;
        nameRow.appendChild(nameLabel);
        nameRow.appendChild(nameValue);
        infoColumn.appendChild(nameRow);
        
        const unitRow = document.createElement('div');
        unitRow.classList.add('row');
        const unitLabel = document.createElement('div');
        unitLabel.classList.add('col-4', 'unit', 'label');
        unitLabel.innerText = 'Currency Unit: ';
        const unitValue = document.createElement('div');
        unitValue.classList.add('col-8', 'unit');
        unitValue.innerText = unit;
        unitRow.appendChild(unitLabel);
        unitRow.appendChild(unitValue);
        infoColumn.appendChild(unitRow);
        listItem.appendChild(infoColumn);
        cryptoList.appendChild(listItem);
      });
      loadingIndicator.classList.add('hidden');
    });
}

displayCryptoRates();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5 && start < total) {
    displayCryptoRates();
  }
});
