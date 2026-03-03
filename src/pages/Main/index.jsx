import { ButtonInput, Container, Items, Search, SearchInput } from "./styles"

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
        <h1>Artigos</h1>

        <Search>
          <SearchInput
            type="text"
            name="search"
            id="search"
            placeholder="Buscar"
          ></SearchInput>

          <ButtonInput>Buscar</ButtonInput>
        </Search>

        <Items>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </Items>
      </Container>
    </>
  )
}

export default Main
