const API_KEY = 'd2f90891898cfa05b754f518f724a275';

const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
    
    console.log(position);
}

const setWeatherData = data => {
    console.log(data);
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}