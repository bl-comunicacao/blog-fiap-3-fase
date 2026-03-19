import Container from "../../components/Ui/Container"
import Title from "../../components/Ui/Title"
import Button from "../../components/Ui/Button"
import {
  Items,
  Actions,
  LoadingMessage,
  LoadingSkeletonGrid,
  LoadingSkeletonCard,
} from "./styles"

import api from "../../services/api"
import Post from "../../components/Post"
import useInfinitePosts from "../../hooks/useInfinitePosts"
import Modal from "../../components/Ui/Modal"
import { useState } from "react"

const Dashboard = () => {
  const { posts, isLoading, removePostById } = useInfinitePosts({
    endpoint: "/posts",
    pageSize: 6,
  })
  const [postToDelete, setPostToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const requestDeletePost = (id) => {
    setPostToDelete(id)
  }

  const cancelDeletePost = () => {
    setPostToDelete(null)
  }

  const confirmDeletePost = async () => {
    if (!postToDelete) return

    setIsDeleting(true)
    try {
      await api.delete(`/posts/${postToDelete}`)
      removePostById(postToDelete)
      setPostToDelete(null)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Container>
        <Title size="lg" align="center">
          Gerenciar posts
        </Title>

        <Actions>
          <Button to="/create-post">Criar novo post</Button>
        </Actions>

        <Items>
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onDelete={requestDeletePost}
              showActions={true}
            />
          ))}
        </Items>
        {isLoading && <LoadingMessage>Carregando mais posts...</LoadingMessage>}
        {isLoading && (
          <LoadingSkeletonGrid>
            {Array.from({ length: 3 }).map((_, index) => (
              <LoadingSkeletonCard key={`dashboard-skeleton-${index}`} />
            ))}
          </LoadingSkeletonGrid>
        )}
      </Container>

      <Modal
        open={Boolean(postToDelete)}
        title="Excluir post"
        message="Tem certeza que deseja excluir este post? Essa ação não pode ser desfeita."
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        onClose={cancelDeletePost}
        onConfirm={confirmDeletePost}
        isLoading={isDeleting}
      />
    </>
  )
}

export default Dashboard
