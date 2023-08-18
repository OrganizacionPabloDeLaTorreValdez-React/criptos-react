import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ImgCriptos from "./assets/imgs/imagen-criptos.png";
import Formulario from "./components/Fomulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 900px;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Imagen = styled.img`
  display: block;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  max-width: 400px;
  width: 80%;
`

const Heading = styled.h1`
  margin-top: 80px;
  margin-bottom: 50px;
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 34px;
  color: #fff;

  &::after {
    content: '';
    display: block;
    margin: 10px auto 0 auto;
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
  }
`

const App = () => {
  const [ monedas, setMonedas ] = useState({});
  const [ cotizacion, setCotizacion ] = useState({});
  const [ cargando, setCargando ] = useState(false);

  useEffect(() => {
    if(Object.keys(monedas ?? {}).length > 0) {
      const {moneda, criptomoneda} = monedas;
      const cotizarCripto = async () => {
        setCargando(true);

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const resultado = await fetch(url)
          .then(res => res.ok ? Promise.resolve(res) : Promise.reject('error calling service'))
          .then(res => res.json())
          .catch(err => console.log(err));

        setCotizacion(resultado.DISPLAY[criptomoneda][moneda]);
        setCargando(false);
      }
      cotizarCripto();
    }
  }, [monedas]);

  return (
    <>
      <Contenedor>
        <Imagen 
          src={ImgCriptos} 
          alt="imagenes criptomonedas"
        />
        <div>
          <Heading>Cotiza Criptomonedas al Instante</Heading>
          <Formulario 
            setMonedas={setMonedas}
          />
          {
            cargando && <Spinner />
          }
          {
            !cargando && cotizacion?.PRICE && 
            <Resultado 
              cotizacion={cotizacion}
            />
          }
        </div>
      </Contenedor>
    </>
  )
}

export default App;
