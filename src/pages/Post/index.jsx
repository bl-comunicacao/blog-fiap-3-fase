import { PostContainer } from "./styles"

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

      api.get("/user/" + response.data.id).then((response) => {
        setUser(response.data)
      })
    })
  }, [])

  return (
    <>
      <PostContainer>
        <span className="date">{post.date}</span>
        <span className="category">{post.category}</span>

        <h3 className="title">{post.title}</h3>
        <p>{post.description}</p>
      </PostContainer>
    </>
  )
}

export default Post
