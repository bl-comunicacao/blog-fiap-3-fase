import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Input from "../../components/Ui/Input"
import Textarea from "../../components/Ui/Textarea"
import Button from "../../components/Ui/Button"
import Container from "../../components/Ui/Container"
import Title from "../../components/Ui/Title"
import { Form } from "./styles"

import { FiType, FiFileText, FiUser } from "react-icons/fi"

const CreatePost = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [resume, setResume] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newPost = {
      title,
      resume,
      author,
      description,
      date: new Date().toISOString(),
    }

    await fetch("http://localhost:4000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })

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

          <Input
            type="text"
            name="resume"
            placeholder="Digite um resumo"
            icon={FiFileText}
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />

          <Input
            type="text"
            name="author"
            placeholder="Digite o autor"
            icon={FiUser}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <Textarea
          name="description"
          placeholder="Digite o conteúdo completo"
          rows={12}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
