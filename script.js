const wrapper = document.querySelector('.wrapper'),
inputPart = wrapper.querySelector('.input-part'),
infoTxt = inputPart.querySelector('.info-txt'),
inputField = inputPart.querySelector('input'),
locationBtn = inputPart.querySelector('button'),
apiKey = 'e2f07fa5296109348d9d890fa06b4f2c';

let api;

inputField.addEventListener('keyup', e =>{
    if(e.key == 'Enter' && inputField.value != ''){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener('click', () =>{
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSucess, onError);
    } else {
        alert('No se pudo obtener la ubicación');
    }
})

function onSucess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add('error');
}

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetchData();
}

function fetchData() {
    infoTxt.innerText = 'Obteniendo datos del clima...';
    infoTxt.classList.add('pending');
    fetch(api).then(response => response.json())
        .then(result => weatherDetails(result));
}

function weatherDetails(info){
    if(info.cod == '404'){
        infoTxt.innerText = `${inputField.value} no es un nombre válido de ciudad`;
        infoTxt.classList.replace('pending', 'error');
    } else {
        infoTxt.classList.remove('pending', 'error');
        console.log(info);
    }
    
}