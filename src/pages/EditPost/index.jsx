import Input from "../../components/Ui/Input"
import Textarea from "../../components/Ui/Textarea"
import Button from "../../components/Ui/Button"
import Container from "../../components/Ui/Container"
import Title from "../../components/Ui/Title"
import { Form } from "./styles"

import { FiType, FiFileText, FiUser } from "react-icons/fi"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../../services/api"

const EditPost = () => {
  const { idPost } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [resume, setResume] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [userId, setUserId] = useState("")

  useEffect(() => {
    const loadPost = async () => {
      const response = await api.get("/posts/" + idPost)
      const data = response.data

      setTitle(data.title)
      setResume(data.resume)
      setAuthor(data.author)
      setDescription(data.description)
      setUserId(data.userId)
    }

    loadPost()
  }, [idPost])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedPost = {
      title,
      resume,
      author,
      description,
      userId,
    }

    await api.put("/posts/" + idPost, updatedPost)

    navigate("/dashboard")
  }

  return (
    <Container>
      <Title size="md" align="center">
        Editar post
        <p>Atualize os campos abaixo para editar</p>
      </Title>

      <Form onSubmit={handleSubmit}>
        <div className="form-group">
          <Input
            type="text"
            name="title"
            placeholder="Digite um título"
            icon={FiType}
            maxLength={120}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Input
            type="text"
            name="resume"
            placeholder="Digite um resumo curto"
            icon={FiFileText}
            maxLength={200}
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            required
          />

          <Input
            type="text"
            name="author"
            placeholder="Digite o nome do autor"
            icon={FiUser}
            maxLength={80}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <Textarea
          name="description"
          placeholder="Digite o conteúdo completo"
          rows={12}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <div className="actions">
          <Button type="submit">Editar post</Button>

          <Button to="/dashboard" variant="secondary">
            Voltar
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default EditPost
