const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q="

const api_key = ''

const cityWeatherInput = document.querySelector('#city')
const cityWeatherInputButton = document.querySelector('#getTemp')
const cityWeatherResults = document.querySelector('#results')

cityWeatherInputButton.addEventListener('click', inputButtonClick)

const inputButtonClick = event =>
{
    event.preventDefault()
    let query = cityWeatherInput.value
    collectResults(query)
}

const collectResults = query =>
{
    try
    {
        let results = await axios.get(`${weatherUrl}${query}${api_key}`)
        console.log(results)
        renderResults(results)
    } catch (error)
    {
        console.log(`Oops! There was an error: ${error}`)
    }
}


const renderResults = results =>
{
    console.log("Hello from function")
}

renderResults()


