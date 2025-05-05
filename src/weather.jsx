import { useState } from "react"
import { WeatherInput } from "./weatherInput";
import { GoSearch } from "react-icons/go";
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FaTemperatureFull } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa6";
import { AiFillDashboard } from "react-icons/ai";


export const Weather = () => {

  const [stateValue, setStateValue] = useState("");
  const [weather, setWeather] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(stateValue) {
      const city = stateValue;
      const key = "c33ecddffd96e7dc6aa94c5e89e44aa1";
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
      setStateValue("");
      try {
        const response = await fetch(api);
        const data = await response.json();
        console.log(data);
        setWeather(data);
      } catch (error) {
        
      }
    }
  }

  return (
    <div className="bg-black">
      <form className="flex flex-row bg-[#1e1e1e] items-center" onSubmit={(e) => handleSubmit(e)}>
        <GoSearch color="white" size={24}/>
        <WeatherInput 
          stateValue = {stateValue}
          setStateValue = {setStateValue}
        />
        <Button type="submit" variant="outline" size="icon">
          <ChevronRight />
        </Button>
      </form>
      <div>
        {weather?.weather && weather.sys.country.length > 0 && (
          <h1 className="text-white">{weather?.name}, {weather?.sys?.country}</h1>
        )}
        {weather?.weather && weather.weather.length > 0 && (
          <span className="text-white">{weather.weather[0].main}</span>
        )}
        {weather?.weather && weather.weather.length > 0 && (
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} />
        )}
        <div>
        {weather?.main?.temp && weather.main.temp.length > 0 && (
          <span className="text-white">{weather?.main?.temp}</span>
        )}
        {weather?.main && weather?.wind && (
          <ul className="bg-[#1e1e1e]">
            <li>
              <FaTemperatureFull color="white" size={25}/>
              <div>
                <span className="text-white">Feels Like</span>
                <span className="text-white">{weather?.main?.feels_like}</span>
              </div>
            </li>
            <li>
              <WiHumidity color="white" size={25}/>
              <div>
                <span className="text-white">Humidity</span>
                <span className="text-white">{weather?.main?.humidity}</span>
              </div>
            </li>
            <li>
              <FaWind color="white" size={25}/>
              <div>
                <span className="text-white">Wind</span>
                <span className="text-white">{weather?.wind?.speed}</span>
              </div>
            </li>
            <li>
              <div>
                <AiFillDashboard color="white" size={25}/>
                <span className="text-white">pressure</span>
                <span className="text-white">{weather?.main?.pressure}</span>
              </div>
            </li>
          </ul>
        )}
        </div>
      </div>
    </div>
  )
}