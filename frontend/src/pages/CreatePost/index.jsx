import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Input from "../../components/Ui/Input"
import Textarea from "../../components/Ui/Textarea"
import Button from "../../components/Ui/Button"
import Container from "../../components/Ui/Container"
import Title from "../../components/Ui/Title"
import { Form } from "./styles"
import api from "../../services/api"

import { FiType } from "react-icons/fi"

const CreatePost = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newPost = {
      title,
      content,
    }

    await api.post("/posts", newPost)

    navigate("/dashboard")
  }

  return (
    <Container>
      <Title size="md" align="center">
        Adicionar post
        <p>Preencha os campos abaixo para adicionar um novo post</p>
      </Title>

      <Form onSubmit={handleSubmit}>
        <div className="form-group">
          <Input
            type="text"
            name="title"
            placeholder="Digite um título"
            icon={FiType}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

        </div>

        <Textarea
          name="content"
          placeholder="Digite o conteúdo completo"
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="actions">
          <Button type="submit">Criar post</Button>
          <Button to="/dashboard" variant="secondary">
            Voltar
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default CreatePost
