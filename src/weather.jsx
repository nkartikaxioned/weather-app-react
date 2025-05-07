import { useState } from "react"
import { WeatherInput } from "./weatherInput";
import { GoSearch } from "react-icons/go";
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FaTemperatureFull } from "react-icons/fa6";
import { MdWaterDrop } from "react-icons/md";
import { FaWind } from "react-icons/fa6";
import { AiFillDashboard } from "react-icons/ai";


export const Weather = () => {

  const [stateValue, setStateValue] = useState("");
  const [weather, setWeather] = useState("");
  const [unit, setUnit] = useState("metric");
  const [response, setResponse] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(stateValue) {
      const city = stateValue;
      const key = "c33ecddffd96e7dc6aa94c5e89e44aa1";
      const units = unit;
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;
      setStateValue("");
      try {
        const response = await fetch(api);
        if (!response.ok) throw new Error('Failed to fetch weather');
        const data = await response.json();
        setResponse(!false);
        setWeather(data);
      } catch (error) {
        setResponse(!true);
      }
    }
  }

  const handleClickCelsius = (e) => {
    setUnit("metric");
    handleSubmit(e);
  }

  const handleClickFarenheit = (e) => {
    setUnit("imperial");
    handleSubmit(e);
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-black w-(--percentage-40) rounded-(--10) p-6">
        <div className="flex  justify-between">
          <form 
            className="flex flex-row bg-(--light-gray) rounded-(--10) items-center pl-2 w-(--percentage-50)" 
            onSubmit={(e) => handleSubmit(e)}>
            <GoSearch color="white" size={24}/>
            <WeatherInput 
              stateValue = {stateValue}
              setStateValue = {setStateValue}
              placeholder = "Search for a City..."
              className = "w-(--percentage-82) placeholder:text-white"
            />
            <Button type="submit" variant="outline" size="icon">
              <ChevronRight />
            </Button>
          </form>
          <div className="weather__units">
            <span className="weather_unit_celsius text-white" onClick={(e) => {handleClickCelsius(e)}}>°C</span>
            <span className="weather_unit_farenheit text-white" onClick={(e) => {handleClickFarenheit(e)}}>°F</span>
          </div>
        </div>
        {response !== false &&  
          <div 
            className="bg-black flex justify-center flex-col items-center mt-16">
            {weather?.weather && weather.sys.country.length > 0 && (
              <h1 
                className="text-white">
                  {weather?.name}, {weather?.sys?.country}
                </h1>
            )}
            {weather?.weather && weather.weather.length > 0 && (
              <span 
                className="text-white py-2 px-2.5 bg-(--light-gray) rounded-2xl mt-7">
                  {weather.weather[0].main}
                </span>
            )}
            {weather?.weather && weather.weather.length > 0 && (
              <figure className="h-[150px] w-[150px]">
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} />
              </figure>
            )}
            <div className="w-full">
              {weather?.main?.temp && (
                <h2 
                  className="text-white text-center">
                  {weather?.main?.temp}°
                </h2>
              )}
              {weather?.main?.temp_max && weather?.main?.temp_min && (
                <div className="text-center mt-3">
                  <span className="text-white">
                    Min: {weather?.main?.temp_min}°
                  </span>
                  <span className="text-white ml-4">
                    Max: {weather?.main?.temp_max}°
                  </span>
                </div>
              )}
              {weather?.main && weather?.wind && (
                <ul 
                  className="flex flex-wrap rounded-2xl gap-5 mt-12">
                  <li 
                    className="bg-(--light-gray) rounded-(--8) p-5 basis-(--percentage-48) flex items-center">
                    <FaTemperatureFull 
                      color="white" 
                      size={25}
                    />
                    <div className="ml-3">
                      <span className="text-white block">Feels Like</span>
                      <span className="text-white block">{weather?.main?.feels_like}°</span>
                    </div>
                  </li>
                  <li 
                    className="bg-(--light-gray) rounded-(--8) p-5 basis-(--percentage-48) flex items-center">
                    <MdWaterDrop 
                      color="white" 
                      size={25}
                    />
                    <div className="ml-3">
                      <span className="text-white block">Humidity</span>
                      <span className="text-white block">{weather?.main?.humidity}%</span>
                    </div>
                  </li>
                  <li 
                    className="bg-(--light-gray) rounded-(--8) p-5 basis-(--percentage-48) flex items-center">
                    <FaWind 
                      color="white" 
                      size={25}
                    />
                    <div className="ml-3">
                      <span className="text-white block">Wind</span>
                      <span className="text-white block">
                        {weather?.wind?.speed} {unit == "metric" ? "m/s" : "mph" }
                      </span>
                    </div>
                  </li>
                  <li 
                    className="bg-(--light-gray) rounded-(--8) p-5 basis-(--percentage-48) flex items-center">
                    <AiFillDashboard 
                      color="white" 
                      size={25}
                    />
                    <div className="ml-3">
                      <span className="text-white block">pressure</span>
                      <span className="text-white block">{weather?.main?.pressure} hPa</span>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </div>
        }
      </div>
    </div>
  )
}