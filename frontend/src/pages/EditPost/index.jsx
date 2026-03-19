import { Input, Textarea, Button, Container, Title, Modal } from "../../components/Ui"

import { FiType, FiFileText } from "react-icons/fi"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../../services/api"
import { usePostById } from "../../hooks"

const EditPost = () => {
  const { idPost } = useParams()
  const navigate = useNavigate()
  const { post, isLoading } = usePostById(idPost)

  if (isLoading || !post) {
    return (
      <Container>
        <Title size="md" align="center">
          Carregando post...
        </Title>
      </Container>
    )
  }

  return (
    <EditPostForm
      key={idPost}
      idPost={idPost}
      initialTitle={post.title || ""}
      initialContent={post.content || ""}
      onSuccess={() => navigate("/dashboard")}
    />
  )
}

const EditPostForm = ({ idPost, initialTitle, initialContent, onSuccess }) => {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsConfirmModalOpen(true)
  }

  const cancelUpdate = () => {
    setIsConfirmModalOpen(false)
  }

  const confirmUpdate = async () => {
    if (!idPost) return

    setIsSaving(true)
    try {
      await api.put(`/posts/${idPost}`, { title, content })
      setIsConfirmModalOpen(false)
      onSuccess()
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Container>
      <Title size="md" align="center">
        Editar post
        <p>Atualize os campos abaixo para editar</p>
      </Title>

      <form className="flex items-center flex-col gap-[1.6rem] w-full max-w-[96rem] mx-auto" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-[1.6rem] [&>div]:max-w-full">
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
            name="content-preview"
            placeholder="Digite o conteudo do post"
            icon={FiFileText}
            maxLength={200}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

        </div>

        <Textarea
          name="content"
          placeholder="Digite o conteúdo completo"
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="flex gap-[1.6rem] mt-[0.8rem]">
          <Button type="submit">Editar post</Button>

          <Button to="/dashboard" variant="secondary">
            Voltar
          </Button>
        </div>
      </form>

      <Modal
        open={isConfirmModalOpen}
        title="Confirmar alteração"
        message="Deseja salvar as alterações deste post?"
        confirmLabel="Salvar alterações"
        cancelLabel="Cancelar"
        onClose={cancelUpdate}
        onConfirm={confirmUpdate}
        isLoading={isSaving}
      />
    </Container>
  )
}

export default EditPost
