import Container from "../../components/Ui/Container"
import Title from "../../components/Ui/Title"
import { Items } from "./styles"

import api from "../../services/api"
import Post from "../../components/Post"
import { useState, useEffect } from "react"

const Dashboard = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    api.get("/posts").then((response) => {
      setPosts(response.data)
    })
  }, [])

  const deletePost = async (id) => {
    const confirmDelete = window.confirm("Deseja excluir este post?")

    if (!confirmDelete) return

    await api.delete(`/posts/${id}`)

    setPosts(posts.filter((post) => post.id !== id))
  }

  return (
    <>
      <Container>
        <Title size="lg" align="center">
          Gerenciar posts
        </Title>

        <Items>
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onDelete={deletePost}
              showActions={true}
            />
          ))}
        </Items>
      </Container>
    </>
  )
}

export default Dashboard
