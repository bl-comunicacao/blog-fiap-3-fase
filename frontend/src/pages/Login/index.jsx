import Input from "../../components/Ui/Input"
import Button from "../../components/Ui/Button"
import Container from "../../components/Ui/Container"
import Title from "../../components/Ui/Title"
import { Logo, Form } from "./styles"
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
          <Logo>
            <img src={logo} alt="Logotipo do Blog" />
            <p>
              Blog<span>.</span>
            </p>
          </Logo>
        </Link>

        <Title size="md" align="center">
          Área restrita para professores
        </Title>

        <Form onSubmit={handleSubmit}>
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
        </Form>
      </Container>
    </>
  )
}

export default Login
