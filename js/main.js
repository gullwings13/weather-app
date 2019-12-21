const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q="
const api_key = '&appid=147fe3d209f5bf0d1d1b121bd666ab17'

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
        let results = await axios.get(`${weatherUrl}${query}${api_key}`)
        renderResults(results)
    } catch (error)
    {
        console.log(`Oops! There was an error: ${error}`)
    }
}

const renderResults = results =>
{
    console.log("Hello from function")
    console.log(results.data.name)
    let cityName = document.createElement('h1')
    cityName.innerHTML = results.data.name
    cityWeatherResults.append(cityName)
    let countryCode = document.createElement('h2')
    countryCode.innerHTML = results.data.sys.country
    cityWeatherResults.append(countryCode)
}

cityWeatherInputButton.addEventListener('click', inputButtonClick)



