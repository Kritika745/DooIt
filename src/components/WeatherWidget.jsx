import { useSelector } from "react-redux"

const WeatherWidget = ({darkMode}) => {
  const { data, loading, error } = useSelector((state) => state.weather)

  if (loading) {
    return (
      <div className="flex items-center text-sm text-gray-500">
        <svg
          className="animate-spin h-4 w-4 mr-2 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading weather...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-sm text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Weather unavailable
      </div>
    )
  }

  if (!data) {
    return null
  }

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  return (
    <div className={`hidden md:flex items-center ${darkMode ? "bg-[#232323]" : "bg-white"} rounded-md px-3 py-1 shadow-sm border border-gray-200`}>
      <img
        src={getWeatherIcon(data.weather[0].icon) || "/placeholder.svg"}
        alt={data.weather[0].description}
        className="h-8 w-8"
      />
      <div className="ml-1">
        <div className="text-sm font-medium">{Math.round(data.main.temp)}°C</div>
        <div className="text-xs text-gray-500">{data.name}</div>
      </div>
    </div>
  )
}

export default WeatherWidget

