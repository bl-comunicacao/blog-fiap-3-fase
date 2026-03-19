import { Container, Title, Button, Modal } from "../../components/Ui"

import api from "../../services/api"
import { Post } from "../../components"
import { useInfinitePosts } from "../../hooks"
import { DEFAULT_POSTS_PAGE_SIZE } from "../../constants/pagination"
import { useState } from "react"

const Dashboard = () => {
  const { posts, isLoading, hasMorePosts, removePostById } = useInfinitePosts({
    endpoint: "/posts",
    pageSize: DEFAULT_POSTS_PAGE_SIZE,
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
        <Title className="text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem] xl:text-[3.8rem] text-center">
          Gerenciar posts
        </Title>

        <div className="flex justify-center items-center mt-10 mb-[4.2rem]">
          <Button to="/create-post">Criar novo post</Button>
        </div>

        <div className="w-full flex flex-wrap gap-[3.2rem] max-[800px]:flex-col max-[800px]:gap-[3.2rem]">
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onDelete={requestDeletePost}
              showActions={true}
            />
          ))}
        </div>
        {isLoading && <p className="w-full text-center mt-[2.4rem] text-[1.6rem] text-[var(--white-dark)]">Carregando mais posts...</p>}
        {!isLoading && hasMorePosts && posts.length > 0 && (
          <div className="w-full text-center mt-[2.4rem]">
            <p className="text-[1.4rem] text-[var(--gray-6)]">
              Existem mais posts para carregar. Continue rolando.
            </p>
            <span className="block mt-[0.6rem] text-[1.8rem] text-[var(--blue-light)] animate-bounce">
              ↓
            </span>
          </div>
        )}
        {isLoading && (
          <div className="w-full flex flex-wrap gap-[3.2rem] mt-[1.6rem] max-[800px]:flex-col">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`dashboard-skeleton-${index}`}
                className="w-[calc(33.333%-2.2rem)] min-h-[18rem] border border-[rgba(255,255,255,0.08)] rounded-[0.8rem] bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0.05)_75%)] bg-[length:200%_100%] animate-pulse max-[1100px]:w-[calc(50%-1.6rem)] max-[800px]:w-full"
              />
            ))}
          </div>
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
