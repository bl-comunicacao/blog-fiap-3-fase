import Input from "../../components/Ui/Input"
import Button from "../../components/Ui/Button"
import Container from "../../components/Ui/Container"
import Title from "../../components/Ui/Title"
import { Logo, Form } from "./styles"
import { FiUser, FiUnlock } from "react-icons/fi"
import { Link } from "react-router-dom"

import logo from "../../assets/svg/logo.svg"

const Login = () => {
  return (
    <>
      <Container>
        <Link to="/">
          <Logo>
            <img src={logo} alt="Logotipo do Blog" />
            <p>
              Blog<span>.</span>
            </p>
          </Logo>
        </Link>

        <Title size="md" align="center">
          Olá, faça o login para continuar.
        </Title>

        <Form action="#">
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Digite seu usuário"
            autoComplete="current-password"
            icon={FiUser}
          />

          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua senha"
            autoComplete="current-password"
            icon={FiUnlock}
          />

          <Button type="submit" $full>
            Acessar
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default Login
