import Button from "../../components/Ui/Button"
import Container from "../../components/Ui/Container"
import Title from "../../components/Ui/Title"
import { Logo, Content } from "./styles"

import { Link } from "react-router-dom"

import logo from "../../assets/svg/logo.svg"

const NotFound = () => {
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
          Página não encontrada!
        </Title>

        <Content>
          <p>A página que você tá procurando não existe ou foi removida.</p>
          <Button to="/login" $full>
            Voltar para home
          </Button>
        </Content>
      </Container>
    </>
  )
}

export default NotFound
