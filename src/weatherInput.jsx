import { Input } from "@/components/ui/input"

export const WeatherInput = ({stateValue, setStateValue, placeholder, className}) => {

  const handleInput = (value) => {
    setStateValue(value);
  }

 return (
    <Input 
      value = {stateValue}
      onChange = {(e) => {handleInput(e.target.value)}}
      placeholder = {placeholder}
      className = {className}
    />
 );
}