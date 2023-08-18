import styled from "@emotion/styled";

const Texto = styled.div`
  padding: 15px;
  font-size: 22px;
  text-transform: uppercase;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  text-align: center;
  background-color: #b7322c;
  color: #fff;
`
const Error = ({children}) => {
  return (
    <Texto>
      {children}
    </Texto>
  );
}

export default Error;