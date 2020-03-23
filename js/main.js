const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="
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
    if (localStorage.getItem('weatherAppDefaultCity') != defaultCityForSave)
    {
        localStorage.setItem('weatherAppDefaultCity', defaultCityForSave)
        updateSaveButton()
    }

}

const clearSavedLocationButtonClick = event =>
{
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
    // background image
    let imageBackground = document.createElement('div')
    imageBackground.classList.add('result-background')
    imageBackground.style.backgroundImage = `url(http://openweathermap.org/img/w/${results.data.weather[0].icon}.png)`
    cityWeatherResults.append(imageBackground)

    // City Name
    let cityNameMain = makeTableRow("", results.data.name, results.data.sys.country)
    cityNameMain.classList.add('Rtable-cell--head')
    cityWeatherResults.append(cityNameMain)


    // Weather description
    let weatherDescription = makeTableRow("", results.data.weather[0].description, "")
    weatherDescription.classList.add('Rtable-cell--weather')
    cityWeatherResults.append(weatherDescription)


    // Current temperature
    let currentTemp = makeTableRow("Current Temp:", Math.round(results.data.main.temp), "°F")
    cityWeatherResults.append(currentTemp)


    // Min temp
    let minTempColorSpan = document.createElement('span')
    minTempColorSpan.innerHTML = Math.round(results.data.main.temp_min)
    addTextColorClass(minTempColorSpan)

    let minTemp = makeTableRow("Min Temp:", minTempColorSpan.outerHTML, "°F")
    cityWeatherResults.append(minTemp)


    // Max temp
    let maxTempColorSpan = document.createElement('span')
    maxTempColorSpan.innerHTML = Math.round(results.data.main.temp_max)
    addTextColorClass(maxTempColorSpan)

    let maxTemp = makeTableRow("Max temp:", maxTempColorSpan.outerHTML, "°F")
    cityWeatherResults.append(maxTemp)





    // several string date formatting from stack overflow
    // https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
    // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
    let timeFormatOptions = { timeZone: "America/New_York", timeZoneName: 'short' } // used for sunrise and sunset


    // Sunrise
    let sunRiseTime = new Date(results.data.sys.sunrise * 1000)
    let sunriseTimeString = sunRiseTime.toLocaleTimeString('en-US', timeFormatOptions)

    let sunrisePartA = sunriseTimeString.split(" ")[0]
    let sunrisePartB = sunriseTimeString.split(" ")[1] + " " + sunriseTimeString.split(" ")[2]

    let sunrise = makeTableRow("Sunrise:", sunrisePartA, sunrisePartB)
    cityWeatherResults.append(sunrise)


    // Sunset
    let sunsetTime = new Date(results.data.sys.sunset * 1000)
    let sunsetTimeString = sunsetTime.toLocaleTimeString('en-US', timeFormatOptions)

    let sunsetPartA = sunsetTimeString.split(" ")[0]
    let sunsetPartB = sunsetTimeString.split(" ")[1] + " " + sunsetTimeString.split(" ")[2]

    let sunset = makeTableRow("Sunset:", sunsetPartA, sunsetPartB)
    cityWeatherResults.append(sunset)

    // Hummidity
    let humidity = makeTableRow("Humidity:", results.data.main.humidity, "%")
    cityWeatherResults.append(humidity)

    // Pressure
    let pressure = makeTableRow("Pressure:", results.data.main.pressure, "hPa")
    cityWeatherResults.append(pressure)

    let saveButton = document.createElement('button')
    saveButton.innerHTML = "Save this location as your default"
    saveButton.classList.add('save-button')
    saveButton.addEventListener('click', saveLocationButtonClick)
    cityWeatherResults.append(saveButton)

    if (localStorage.getItem('weatherAppDefaultCity') == defaultCityForSave)
    {
        updateSaveButton()
    }
}

function makeTableRow(label, data, unit)
{
    // <div class="Rtable-cell Rtable-cell--head"><h1>New York</h1></div>
    // <div class="Rtable-cell Rtable-cell--weather">Overcast Clouds</div>
    // <div class="Rtable-cell"><div class="label">Current Temp:</div><div class="data">55</div><div class="unit">°F</div></div>

    let rowElement = document.createElement('div')
    let labelElement = document.createElement('div')
    let dataElement = document.createElement('div')
    let unitElement = document.createElement('div')

    rowElement.classList.add('Rtable-cell')
    labelElement.classList.add('label')
    dataElement.classList.add('data')
    unitElement.classList.add('unit')

    labelElement.innerHTML = label
    dataElement.innerHTML = data
    unitElement.innerHTML = unit


    if (labelElement.innerHTML != "")
    {
        rowElement.append(labelElement)
    }
    rowElement.append(dataElement)
    if (unitElement.innerHTML != "")
    {
        rowElement.append(unitElement)
    }

    return rowElement
}

function addTextColorClass(htmlElement)
{
    htmlElement.classList.add('textBackground')

    if (parseInt(htmlElement.innerHTML) < 0)
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

if (localStorage.getItem('weatherAppDefaultCity') != null)
{
    defaultCityForSave = localStorage.getItem('weatherAppDefaultCity')
    fetchWeather(localStorage.getItem('weatherAppDefaultCity'))
}


