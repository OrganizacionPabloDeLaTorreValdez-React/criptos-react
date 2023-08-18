import styled from "@emotion/styled";

const Contenedor = styled.div`
  display: flex;
  column-gap: 1rem;
  align-items: center;
  margin-top: 20px;
  font-family: 'Lato', sans-serif;
  color: #fff;
`
const Imagen = styled.img`
  width: 150px;
`
const Texto = styled.p`
  font-size: 15px;
  span {
    font-weight: 700;
  }
`
const Precio = styled.p`
  font-size: 25px;
  span {
     font-weight: 700;
  }
`
const Contenido = styled.div`
  flex: 1 1 0%;
`
const Resultado = ({
  cotizacion
}) => {
  const { 
    PRICE: price, 
    HIGHDAY: highDay,
    LOWDAY: lowDay,
    CHANGEPCT24HOUR: changePct24Hour,
    IMAGEURL: imageUrl,
    LASTUPDATE: lastUpdate,
  } = cotizacion;
  return (
    <Contenedor>
      <Imagen 
        src={`https://www.cryptocompare.com/${imageUrl}`} 
        alt="imagen cripto" 
      />
      <Contenido>
        <Precio>El precio es de: <span>{price}</span></Precio>
        <Texto>Precio más alto del día: <span>{highDay}</span></Texto>
        <Texto>Precio más bajo del día: <span>{lowDay}</span></Texto>
        <Texto>Variación últimas 24 horas: <span>{changePct24Hour}</span></Texto>
        <Texto>Ultima actualización: <span>{lastUpdate}</span></Texto>
      </Contenido>
    </Contenedor>
  );
}

export default Resultado;