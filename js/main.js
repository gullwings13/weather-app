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
    localStorage.setItem('weatherAppDefaultCity', defaultCityForSave);
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
    let cityName = document.createElement('h1')
    cityName.innerHTML = results.data.name
    cityWeatherResults.append(cityName)

    // Country code
    let countryCode = document.createElement('h2')
    countryCode.innerHTML = results.data.sys.country
    cityWeatherResults.append(countryCode)

    // Current temperature
    let currentTemp = document.createElement('h2')
    currentTemp.innerHTML = `Current Temp:${results.data.main.temp}`

    cityWeatherResults.append(currentTemp)

    // Weather description
    let weatherDescription = document.createElement('h2')
    // console.log(results.data.weather[0].description)
    weatherDescription.innerHTML = `${results.data.weather[0].description}`
    cityWeatherResults.append(weatherDescription)

    // Min temp
    let minTemp = document.createElement('h2')
    let minTempColorSpan = document.createElement('span')
    minTemp.innerHTML = `Minimum Temp:`
    minTempColorSpan.innerHTML = results.data.main.temp_min
    addTextColorClass(minTempColorSpan)
    minTemp.append(minTempColorSpan)
    cityWeatherResults.append(minTemp)

    // Max temp
    let maxTemp = document.createElement('h2')
    let maxTempColorSpan = document.createElement('span')
    maxTemp.innerHTML = `Maximum Temp:`
    maxTempColorSpan.innerHTML = results.data.main.temp_max
    addTextColorClass(maxTempColorSpan)
    maxTemp.append(maxTempColorSpan)
    cityWeatherResults.append(maxTemp)

    let weatherImage = document.createElement('img')
    weatherImage.src = `http://openweathermap.org/img/w/${results.data.weather[0].icon}.png`
    cityWeatherResults.append(weatherImage)

    let sunrise = document.createElement('h2')
    // string date formatting from stack overflow
    // https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
    let time = Date(results.data.sys.sunrise)
    let timeString = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    sunrise.innerHTML = `Sunrise:${timeString}`
    cityWeatherResults.append(sunrise)

    let sunset = document.createElement('h2')
    // string date formatting from stack overflow
    // https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
    let sunsetTime = Date(results.data.sys.sunset)
    let sunsetTimeString = sunsetTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    sunset.innerHTML = `Sunset:${sunsetTimeString}`
    cityWeatherResults.append(sunset)

    let humidity = document.createElement('h2')
    humidity.innerHTML = `Humidity:${results.data.main.humidity}`
    cityWeatherResults.append(humidity)

    let pressure = document.createElement('h2')
    pressure.innerHTML = `Pressure:${results.data.main.pressure}`
    cityWeatherResults.append(pressure)

    let saveButton = document.createElement('button')
    saveButton.innerHTML = "Save this location as your default"
    saveButton.addEventListener('click', saveLocationButtonClick)
    cityWeatherResults.append(saveButton)

    // Bonus
    // Add additional info.Include the sunrise and sunset times and some information about humidity, atmospheric pressure, etc.

    // CSS Bonus
    // Code your min and max temperatures to turn blue if they are under 40, and red if they are above 90.

    // Winter Break Blizzard Bonus
    // Research local storage.Use local storage to allow a user to save their city / zipcode info in the browser.


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
    fetchWeather(localStorage.getItem('weatherAppDefaultCity'))
}


