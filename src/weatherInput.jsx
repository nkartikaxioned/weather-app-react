import { Input } from "@/components/ui/input"

export const WeatherInput = ({stateValue, setStateValue}) => {

  const handleInput = (value) => {
    setStateValue(value);
  }

 return (
    <Input 
      value = {stateValue}
      onChange = {(e) => {handleInput(e.target.value)}}
    />
 );
}