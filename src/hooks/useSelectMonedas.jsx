import {useState} from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  display: block;
  margin: 15px 0;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #fff;
`

const Select = styled.select`
  padding: 14px;
  margin-bottom: 30px;
  width: 100%;
  font-size: 18px;
  border-radius: 10px;
`
const useSelectMonedas = (label, options) => {
  const [state, setState] = useState('');

  const SelectMonedas = () => {
    const listOptions = () => {
      return options.map((option) => (
        <option key={option.id} value={option.id}>{option.nombre}</option>
      ));
    }
    return (
      <>
        <Label htmlFor="">{label}</Label>
        <Select
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">Seleccione</option>
          {
            listOptions()
          }
        </Select>
      </>
    );
  }
  return [state, SelectMonedas];
}

export default useSelectMonedas;