import Title from "../../components/Ui/Title"
import Button from "../../components/Ui/Button"

import { PostContainer, PostActions } from "./styles"

import { useState, useEffect } from "react"
import api from "../../services/api"
import { useParams } from "react-router-dom"

const Post = () => {
  const [post, setPost] = useState([])
  const [user, setUser] = useState([])
  const { idPost } = useParams()

  useEffect(() => {
    api.get("/posts/" + idPost).then((response) => {
      setPost(response.data)

      api.get("/users/" + response.data.id).then((response) => {
        setUser(response.data)
      })
    })
  }, [])

  return (
    <>
      <PostContainer>
        <span className="date">{post.date}</span>
        <span className="category">{post.category}</span>

        <Title size="xl" align="center">
          {post.title}
        </Title>

        <p>{post.description}</p>

        <div className="profile">
          <div className="photo"></div>
          <p>{user.name}</p>
        </div>
      </PostContainer>

      <PostActions>
        <Button to="/">Voltar para home</Button>
      </PostActions>
    </>
  )
}

export default Post
