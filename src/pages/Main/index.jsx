import Input from "../../components/Ui/Input"
import Button from "../../components/Ui/Button"
import Container from "../../components/Ui/Container"
import Title from "../../components/Ui/Title"
import { FiSearch } from "react-icons/fi"
import { Items, Search } from "./styles"

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
        <Title size="lg" align="center">
          Artigos
        </Title>

        <Search>
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Buscar"
            icon={FiSearch}
          />
          <Button>Buscar</Button>
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
