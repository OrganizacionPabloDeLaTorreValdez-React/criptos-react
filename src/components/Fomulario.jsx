import { useEffect, useState } from "react";
import useSelectMonedas from "../hooks/useSelectMonedas";
import styled from "@emotion/styled";
import { monedas } from "../data/monedas"
import Error from "./Error";

const InputSubmit = styled.input`
  padding: 10px;
  width: 100%;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  background-color: #9497ff;
  color: #fff;
  transition-property: background-color;
  transition-duration: .3s;
  transition-timing-function: ease;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`

const Formulario = ({
  setMonedas,
}) => {
  const [ criptos, setCriptos ] = useState([]);
  const [ error, setError ] = useState(false);
  const [ moneda, SelectMoneda ] = useSelectMonedas('Elige tu Moneda', monedas);
  const [ criptomoneda, SelectCriptoMoneda ] = useSelectMonedas('Elige tu Criptomoneda', criptos);

  useEffect(() => {
    const consultarApi = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"
      const resultado = await fetch(url)
        .then(res => res.ok ? Promise.resolve(res) : Promise.reject('error calling service'))
        .then(res => res.json())
        .catch(err => console.log(err))
      
      const arrayCriptos = resultado.Data.map(cripto => {
        return {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        }
      });
      setCriptos(arrayCriptos);
    }
    consultarApi();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if([moneda,criptomoneda].includes('')) {
      setError(true);
      return;
    }
    setError(false);
    setMonedas({
      moneda,
      criptomoneda,
    });
  }

  return (
    <div>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form
        onSubmit={handleSubmit}
      >
        <SelectMoneda />
        <SelectCriptoMoneda />

        <InputSubmit 
          type="submit" 
          value="Cotizar"
        />
      </form>
    </div>
  );
}

export default Formulario;