export function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

export async function getAccuweatherDataFromLocation(lat, long) {
  const location = lat + "," + long;
  const url = `http://dataservice.accuweather.com//locations/v1/cities/geoposition/search?apikey=626eR4h4xEHAihpvacPQzMiaEo822YxU&q=${location}`;
  const apiCall = await fetch(url);
  const data = await apiCall.json();
  return (data);
}

export function getPlaceID(data) {
  for (var i = 0; i < data.length; i++) {
    var component = data[i];
    if (component.types[0] === "administrative_area_level_2") {
      return component.place_id;
    }
  }
}