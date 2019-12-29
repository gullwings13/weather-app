const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q="
const api_key = '&appid=147fe3d209f5bf0d1d1b121bd666ab17'
const units = '&units=imperial'

const cityWeatherInput = document.querySelector('#city')
const cityWeatherInputButton = document.querySelector('#getTemp')
const cityWeatherResults = document.querySelector('#results')
let defaultCityForSave = ""

const inputButtonClick = event =>
{
    event.preventDefault()
    let query = cityWeatherInput.value
    defaultCityForSave = query
    fetchWeather(query)
}

const fetchWeather = (query) =>
{
    cityWeatherInput.value = ''
    cityWeatherResults.innerHTML = ''
    collectResults(query)
}

const saveLocationButtonClick = event =>
{
    event.preventDefault()
    if(localStorage.getItem('weatherAppDefaultCity') != defaultCityForSave)
    {
        localStorage.setItem('weatherAppDefaultCity', defaultCityForSave);
        updateSaveButton()
    }

}

const clearSavedLocationButtonClick = event => {
    event.preventDefault()
    localStorage.removeItem('weatherAppDefaultCity')
    let saveButton = document.querySelector('.save-button')
    saveButton.innerHTML = "Save this location as your default"
    event.target.remove()
}

const updateSaveButton = () =>
{
    let saveButton = document.querySelector('.save-button')
    saveButton.innerHTML = 'This location is saved as your default location!'

    let clearButton = document.createElement('button')
    clearButton.innerHTML = "Clear saved location"
    clearButton.addEventListener('click', clearSavedLocationButtonClick)
    saveButton.parentElement.append(clearButton)
}

const collectResults = async query =>
{
    try
    {
        let results = await axios.get(`${weatherUrl}${query}${api_key}${units}`)
        renderResults(results)
    } catch (error)
    {
        console.log(`Oops! There was an error: ${error}`)
    }
}





const renderResults = results =>
{

    // City Name
    let cityNameMain = document.createElement('h1')
    let cityNameSub = document.createElement('span')
    cityNameMain.innerHTML = results.data.name+" "
    cityNameSub.innerHTML = " "+results.data.sys.country
    cityNameMain.classList.add('main-display-item')
    cityNameSub.classList.add('sub-display-item')
    cityNameMain.append(cityNameSub)
    cityWeatherResults.append(cityNameMain)

    // Current temperature
    let currentTemp = document.createElement('h1')
    currentTemp.innerHTML = `Temp now:${ Math.round(results.data.main.temp)}`
    currentTemp.classList.add('main-display-item')

    cityWeatherResults.append(currentTemp)



    // Min temp
    let minTemp = document.createElement('h1')
    let minTempColorSpan = document.createElement('span')
    minTemp.innerHTML = `Temp min:`
    minTempColorSpan.innerHTML = Math.round(results.data.main.temp_min)
    minTemp.classList.add('main-display-item')
    addTextColorClass(minTempColorSpan)
    minTemp.append(minTempColorSpan)
    cityWeatherResults.append(minTemp)

    // Max temp
    let maxTemp = document.createElement('h1')
    let maxTempColorSpan = document.createElement('span')
    maxTemp.innerHTML = `Temp max:`
    maxTempColorSpan.innerHTML =  Math.round(results.data.main.temp_max)
    maxTemp.classList.add('main-display-item')
    addTextColorClass(maxTempColorSpan)

    maxTemp.append(maxTempColorSpan)
    cityWeatherResults.append(maxTemp)

    // Weather description
    let weatherDescription = document.createElement('h1')
    weatherDescription.innerHTML = `${results.data.weather[0].description}`
    weatherDescription.classList.add('main-display-item')
    cityWeatherResults.append(weatherDescription)

    let imageBackground = document.createElement('div')
    imageBackground.classList.add('result-background')
    imageBackground.style.backgroundImage = `url(http://openweathermap.org/img/w/${results.data.weather[0].icon}.png)`
    //weatherImage.src = `http://openweathermap.org/img/w/${results.data.weather[0].icon}.png`
    cityWeatherResults.append(imageBackground)

    let sunrise = document.createElement('h3')
    // several string date formatting from stack overflow
    // https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
    // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
    let time = new Date(results.data.sys.sunrise*1000)
    let options = { timeZone: "America/New_York", timeZoneName: 'short' } // used for sunrise and sunset
    let timeString = time.toLocaleTimeString('en-US', options)
    sunrise.innerHTML = `Sunrise: ${timeString}`
    sunrise.classList.add('main-display-item')
    cityWeatherResults.append(sunrise)

    let sunset = document.createElement('h3')
    // string date formatting from stack overflow
    // https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format

    let sunsetTime = new Date(results.data.sys.sunset*1000)
    let sunsetTimeString = sunsetTime.toLocaleTimeString('en-US', options)
    sunset.innerHTML = `Sunset: ${sunsetTimeString}`
    sunset.classList.add('main-display-item')
    cityWeatherResults.append(sunset)

    let humidity = document.createElement('h3')
    humidity.innerHTML = `Humidity: ${results.data.main.humidity}`
    humidity.classList.add('main-display-item')
    cityWeatherResults.append(humidity)

    let pressure = document.createElement('h3')
    pressure.innerHTML = `Pressure: ${results.data.main.pressure}`
    pressure.classList.add('main-display-item')
    cityWeatherResults.append(pressure)

    let saveButton = document.createElement('button')
    saveButton.innerHTML = "Save this location as your default"
    saveButton.classList.add('save-button')
    saveButton.addEventListener('click', saveLocationButtonClick)
    cityWeatherResults.append(saveButton)

    if(localStorage.getItem('weatherAppDefaultCity') == defaultCityForSave)
    {
        updateSaveButton()
    }
}

function makeTableRow(label, data, unit)
{



    return rowElement
}

function addTextColorClass(htmlElement)
{
    htmlElement.classList.add('textBackground')

    if(parseInt(htmlElement.innerHTML) < 0)
    {
        htmlElement.style.backgroundPosition = "0%"
    }
    else if (parseInt(htmlElement.innerHTML) > 100)
    {
        htmlElement.style.backgroundPosition = "100%"
    }
    else
    {
        htmlElement.style.backgroundPosition = parseInt(htmlElement.innerHTML) + "%"
    }

}

cityWeatherInputButton.addEventListener('click', inputButtonClick)

if(localStorage.getItem('weatherAppDefaultCity') != null)
{
    defaultCityForSave = localStorage.getItem('weatherAppDefaultCity')
    fetchWeather(localStorage.getItem('weatherAppDefaultCity'))
}


