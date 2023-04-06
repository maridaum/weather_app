'use strict';

const searchBar = document.querySelector('#search');
const btn = document.querySelector('.submit');
const main = document.querySelector('main');

const getWeatherData = function (zipcode) {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=c4f1c6049afe41cb915203039232303&q=${zipcode}`
  )
    .then((res) => res.json())
    /*.then(data => {
        console.log(data);
        console.log((data.location.localtime));
        console.log(data.current.condition.icon);
    }); */
    .then((data) => {
      renderWeather(data);
    });
};

const renderWeather = function (data) {
  const html = `
        <div class="card">
                <p class="location">${data.location.name}, ${data.location.region}</p>
                <p class="date">${data.location.localtime}</p>
                <h2 class="temp"L>${data.current.temp_f}°F</h2>
                <img src="${data.current.condition.icon}">
                <h2 class="condition">${data.current.condition.text}</h2>
            </div>
    `;

  main.insertAdjacentHTML('beforeend', html);
};

btn.addEventListener('click', () => {
  main.innerHTML = '';
  getWeatherData(searchBar.value);
  searchBar.value = '';
});

searchBar.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    main.innerHTML = '';
    getWeatherData(searchBar.value);
    searchBar.value = '';
  }
});
