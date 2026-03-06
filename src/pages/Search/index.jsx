import Container from "../../components/Ui/Container"
import Title from "../../components/Ui/Title"
import Button from "../../components/Ui/Button"
import Post from "../../components/Post"

import { Items, PostActions } from "./styles"

import api from "../../services/api"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const Search = () => {
  const { word_search } = useParams()
  const [search, setSearch] = useState([])

  useEffect(() => {
    api.get(`/posts`).then((response) => {
      const filtered = response.data.filter((post) =>
        Object.values(post).some((val) =>
          String(val).toLowerCase().includes(word_search.toLowerCase()),
        ),
      )
      setSearch(filtered)
    })
  }, [word_search])

  return (
    <Container>
      <Title size="lg" align="center">
        Resultado da busca
      </Title>

      <Items>
        {search.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Items>

      <PostActions>
        <Button to="/">Voltar para home</Button>
      </PostActions>
    </Container>
  )
}

export default Search
