import { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } from "../reducers/weatherReducer"

// Replace with your own API key from OpenWeatherMap
const API_KEY = "2de65452a0b35ca5029bdc3904438eb8"

export const fetchWeather = () => async (dispatch) => {
  dispatch(fetchWeatherStart())

  try {
    // Get user's location
    const position = await getUserLocation()
    const { latitude, longitude } = position.coords

    // Fetch weather data
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`,
    )

    if (!response.ok) {
      throw new Error("Weather data not available")
    }

    const data = await response.json()
    dispatch(fetchWeatherSuccess(data))
  } catch (error) {
    // If API key is not set or geolocation fails, use mock data
    if (!API_KEY || API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
      dispatch(fetchWeatherSuccess(getMockWeatherData()))
    } else {
      dispatch(fetchWeatherFailure(error.message))
    }
  }
}

// Helper function to get user location
const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"))
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    }
  })
}

// Mock weather data for demo purposes
const getMockWeatherData = () => {
  return {
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    main: {
      temp: 22.5,
      feels_like: 21.8,
      temp_min: 20.9,
      temp_max: 23.2,
      pressure: 1015,
      humidity: 65,
    },
    wind: {
      speed: 3.6,
      deg: 160,
    },
    name: "Demo City",
  }
}

