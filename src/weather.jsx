import { useState } from "react"
import { WeatherInput } from "./weatherInput";

export const Weather = () => {

  const [stateValue, setStateValue] = useState("");

  return (
    <div>
      <WeatherInput 
        stateValue = {stateValue}
        setStateValue = {setStateValue}
      />
    </div>
  )
}