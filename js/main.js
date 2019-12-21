const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q="
const api_key = '&appid=147fe3d209f5bf0d1d1b121bd666ab17'
const units = '&units=imperial'

const cityWeatherInput = document.querySelector('#city')
const cityWeatherInputButton = document.querySelector('#getTemp')
const cityWeatherResults = document.querySelector('#results')

const inputButtonClick = event =>
{
    event.preventDefault()
    let query = cityWeatherInput.value
    cityWeatherInput.value = ''
    collectResults(query)
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
    // console.log("Hello from function")
    // console.log(results.data.name)

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
    console.log(results.data.weather.description)
    weatherDescription.innerHTML = `${results.data.weather.description}`
    cityWeatherResults.append(weatherDescription)

    // Min temp
    let minTemp = document.createElement('h2')
    minTemp.innerHTML = `Minimum Temp:${results.data.main.temp_min}`
    cityWeatherResults.append(minTemp)

    // Max temp
    let maxTemp = document.createElement('h2')
    maxTemp.innerHTML = results.data.main.temp_max
    cityWeatherResults.append(`Maximum Temp:${maxTemp}`)

    // let x = document.createElement('h2')
    // x.innerHTML = results.data.x
    // cityWeatherResults.append(x)

}

cityWeatherInputButton.addEventListener('click', inputButtonClick)



