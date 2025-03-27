const searchBar = document.querySelector('#search');
const searchBtn = document.querySelector('.btn');
const wind = document.querySelector('.wind-speed-value');
const humidity = document.querySelector('.humidity-value');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const conditionImg = document.querySelector('.condition');
const details = document.querySelector('.details');

async function getWeatherInfo(cityName) {
  const Apikey = 'f83306f48edb7f75196f6b6e19ffe69d';
  const ApiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

  const response = await fetch(ApiURL + cityName + `&appid=${Apikey}`);
  let data = await response.json();
  console.log(data);
  if (response.status == 404) {
    details.style.display = 'none';
    document.querySelector('.hidden').style.display = 'block';
  } else if (searchBar.value == '') {
    details.style.display = 'none';
    document.querySelector('.hidden').innerHTML = 'Please Enter City Name';
    document.querySelector('.hidden').style.display = 'block';
  } else {
    try {
      wind.innerHTML = Math.round(data.wind.speed) + `m/s`;
      humidity.innerHTML = data.main.humidity + `%`;
      temp.innerHTML = Math.round(data.main.temp) + `°c`;
      city.innerHTML = data.name;
      conditionImg.src = `images/${data.weather[0].main}.png`;

      details.style.display = 'block';
      document.querySelector('.hidden').style.display = 'none';
    } catch (error) {}
  }
}
searchBtn.addEventListener('click', () => getWeatherInfo(searchBar.value));
searchBar.addEventListener('keyup', (e) => {
  if (e.keyCode == 13) {
    getWeatherInfo(searchBar.value);
  }
});
