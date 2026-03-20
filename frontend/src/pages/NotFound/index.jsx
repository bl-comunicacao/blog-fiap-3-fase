import { Button, Container, Title } from "../../components/Ui"

import { Link } from "react-router-dom"

import logo from "../../assets/svg/logo.svg"

const NotFound = () => {
  return (
    <>
      <Container>
        <Link to="/">
          <div className="flex items-center justify-center flex-col mb-[6.4rem]">
            <img className="w-[5.6rem] mb-[1.2rem]" src={logo} alt="Logotipo do Blog" />
            <p className="text-[4.2rem] font-normal text-[var(--white-light)]">
              Blog<span className="text-[var(--blue-light)]">.</span>
            </p>
          </div>
        </Link>

        <Title size="md" align="center">
          Página não encontrada!
        </Title>

        <div className="w-full max-w-[47rem] mx-auto">
          <p className="text-[1.6rem] font-normal text-center text-[var(--gray-5)] mb-[3.2rem]">A página que você tá procurando não existe ou foi removida.</p>
          <Button to="/login" $full>
            Voltar para home
          </Button>
        </div>
      </Container>
    </>
  )
}

export default NotFound
