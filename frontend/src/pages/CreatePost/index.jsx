import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Input, Textarea, Button, Container, Title } from "../../components/Ui"
import api from "../../services/api"
import useAuthStore from "../../stores/useAuthStore"

import { FiType, FiUser } from "react-icons/fi"

const CreatePost = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)

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

      <form className="flex items-center flex-col gap-[1.6rem] w-full max-w-[96rem] mx-auto" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-[1.6rem] [&>div]:max-w-full">
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
            name="author"
            placeholder="Autor"
            icon={FiUser}
            value={user?.name || user?.email || "Professor(a) autenticado(a)"}
            readOnly
          />

        </div>

        <Textarea
          name="content"
          placeholder="Digite o conteúdo completo"
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex gap-[1.6rem] mt-[0.8rem]">
          <Button type="submit">Criar post</Button>
          <Button to="/dashboard" variant="secondary">
            Voltar
          </Button>
        </div>
      </form>
    </Container>
  )
}

export default CreatePost
