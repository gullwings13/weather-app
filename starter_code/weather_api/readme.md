# Build a Weather App using the OpenWeatherMap API

Here's an exciting challenge: You'll be building a small weather app, using your newfound skills with APIs!

### Instructions

For this assignment you'll be using the Open Weather Data API. In order to use it, please follow these steps:

1. Sign up for a free [Open Weather Map](https://home.openweathermap.org/users/sign_up) account!
2. Once you've signed up, you're given an [API key](https://home.openweathermap.org/api_keys). Copy that API key and keep track of it somewhere!
3. Open Postman to check out the data you're working with & to verify that your key works. Make a GET requrest to the following URL in postman, adding your API key to the end.

```
http://api.openweathermap.org/data/2.5/weather?q=10025,us?units=imperial&appid=[PUT YOUR API KEY HERE]
```

#### Your workflow should start with pseudocoding the app logic.
Although the lab submission completion status will be based on the code alone, if your code isn't up to par OR or you found the assignment too challenging to complete you can bet the first place were going to check is your pseudocode.

#### You need to make the following files to support the app:
- main.js
- index.html
- style.css

### Your page should have:
- An input field for a user to enter a zip code or city name
- A submit button
- When the submit button is clicked:
    - A GET request should fetch the weather data from the API
    - The following data should be rendered to the page:
        - City name
        - Current temperature
        - Weather description
        - Min temp
        - Max temp
- Have the temperature turn blue if under 40, and red if above 90.

Here are some zip codes / city names to test!

- 99501 (Anchorage)
- 99723 (Barrow, AK)
- 60605 (Chicago)
- 70124 (New Orleans)
- 77030 (Houston, TX)
- 00902 (San Juan, Puerto Rico)
- 46923 (Delphi, IN)
- 94123 (San Francisco, CA)


## Hints
Here's what a sample URL will look like:

```js
'http://api.openweathermap.org/data/2.5/weather?q=Chicago&units=imperial&appid=02e84210a52ed716535f02989864d080'
```
Following this format:

```js
'http://api.openweathermap.org/data/2.5/weather?q=City&units=imperial&appid=yourAppKey'
```

var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";


// Get an api key: http://openweathermap.org/appid#get
var key = 'Your key here';

