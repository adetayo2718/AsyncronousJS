'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

class Countries {
  #request;
  constructor() {
    this.requestHTTPS('ghana');
    this.#request.addEventListener('load', this._getCountries.bind(this));
    console.log(this);
  }

  requestHTTPS(country) {
    this.#request = new XMLHttpRequest();
    this.#request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    this.#request.send();
  }

  _getCountries() {
    const [data] = JSON.parse(this.#request.responseText);

    const [language] = Object.values(data.languages);
    const [currency] = Object.entries(data.currencies);

    const html = `
        <article class="country">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.continents[0]}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}million people</p>
            <p class="country__row"><span>🗣️</span>${language}</p>
            <p class="country__row"><span>💰</span>${currency[1].name}</p>
          </div>
        </article>
        `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  }
}

const country = new Countries();
