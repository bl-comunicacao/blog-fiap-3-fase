import { Container, Logo } from "./styles"

import logo from "../../assets/svg/logo.svg"

const Login = () => {
  return (
    <>
      <Container>
        <Logo>
          <img src={logo} alt="" />
          <h2>
            Logo<span>.</span>
          </h2>
        </Logo>

        <h1>Olá, faça o login para continuar.</h1>

        <form action="#">
          <input type="text" placeholder="Digite seu usuário" />
          <input type="password" placeholder="Digite sua senha" />
          <button type="submit">Acessar</button>
        </form>
      </Container>
    </>
  )
}

export default Login
