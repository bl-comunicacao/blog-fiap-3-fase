import { Container, Items } from "./styles"

import api from "../../services/api"
import Post from "../../components/Post"
import { useState, useEffect } from "react"

const Main = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    api.get("/posts").then((response) => {
      setPosts(response.data)
    })
  }, [])

  return (
    <>
      <Container>
        <Items>
          {posts.map((post) => (
            <Post
              key={post.id}
              category={post.category}
              title={post.title}
              resume={post.resume}
              author={post.author}
              date={post.date}
            />
          ))}
        </Items>
      </Container>
    </>
  )
}

export default Main
