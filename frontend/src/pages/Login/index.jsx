import { Input, Button, Container, Title } from "../../components/Ui"
import { FiUser, FiUnlock } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

import logo from "../../assets/svg/logo.svg"
import api from "../../services/api"
import useAuthStore from "../../stores/useAuthStore"

const Login = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage("")

    try {
      const response = await api.post("/auth/login", { email, password })
      const user = response.data?.user
      const token = response.data?.token

      if (!token || !user) {
        throw new Error("Dados de autenticação não retornados pelo backend")
      }

      setAuth({ user, token })
      navigate("/dashboard")
    } catch (error) {
      console.error(error)
      const status = error?.response?.status
      const backendMessage = error?.response?.data?.message

      if (status === 500) {
        setErrorMessage(
          "Erro interno no servidor ao autenticar. Verifique a configuração do backend.",
        )
        return
      }

      setErrorMessage(
        backendMessage || "Falha no login. Verifique e-mail e senha.",
      )
    }
  }

  return (
    <>
      <Container>
        <Link to="/">
          <div className="flex items-center justify-center flex-col mb-[1.4rem]">
            <img className="w-[5.6rem] mb-[1.2rem]" src={logo} alt="Logotipo do Blog" />
            <p className="text-[4.2rem] font-normal text-[var(--white-light)]">
              Blog<span className="text-[var(--blue-light)]">.</span>
            </p>
          </div>
        </Link>

        <Title className="text-[1.8rem] text-center">
          Área restrita para professores
        </Title>

        <form className="flex items-center mt-10 flex-col gap-[1.6rem] w-full max-w-[38rem] mx-auto" onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu e-mail"
            autoComplete="email"
            icon={FiUser}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              if (errorMessage) setErrorMessage("")
            }}
          />

          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua senha"
            autoComplete="current-password"
            icon={FiUnlock}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              if (errorMessage) setErrorMessage("")
            }}
          />

          {errorMessage && (
            <p style={{ color: "#dc2626", marginTop: "-4px", marginBottom: "4px" }}>
              {errorMessage}
            </p>
          )}

          <Button type="submit" $full>
            Acessar
          </Button>

          <Button to="/" $full variant="secondary">
            Voltar para home
          </Button>
        </form>
      </Container>
    </>
  )
}

export default Login
