export default getWeather = async (cityId, cityName, country, countryId) => {
  // console.log("SearchResults  " + city);
  // const API_KEY = 'e22d1c07fa47b19cb8d862add6c876d5';
  // const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&sort=population&appid=${API_KEY}&units=metric`);
  // const url = `http://dataservice.accuweather.com/locations/v1/${city}?apikey=626eR4h4xEHAihpvacPQzMiaEo822YxU`
  const url = `http://dataservice.accuweather.com//currentconditions/v1/${cityId}?apikey=626eR4h4xEHAihpvacPQzMiaEo822YxU&detail=true`;
  const api_call = await fetch(url);
  const data = await api_call.json();
  console.log("weather results data is ", data);

  if (data[0].WeatherText) {
    this.props.addCity({
      city: cityName,
      id: cityId,
      country: country,
      countryId: countryId,
      mainDescription: data[0].WeatherText,
      description: data[0].WeatherText,
      temp: data[0].Temperature.Metric.Value,
      // tempMax: data.main.temp_max,
      // tempMin: data.main.temp_min,
      windDirection: 11,
      windSpeed: 12,
      icon: data[0].WeatherIcon,
      error: ""
    });
  } else {
    console.error("Error: with choice of City or Country");
  }
};