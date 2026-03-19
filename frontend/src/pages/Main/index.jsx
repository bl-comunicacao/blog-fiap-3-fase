import Input from "../../components/Ui/Input"
import Button from "../../components/Ui/Button"
import Container from "../../components/Ui/Container"
import Title from "../../components/Ui/Title"
import { FiSearch } from "react-icons/fi"
import {
  Items,
  Search,
  LoadingMessage,
  LoadingSkeletonGrid,
  LoadingSkeletonCard,
} from "./styles"

import Post from "../../components/Post"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useInfinitePosts from "../../hooks/useInfinitePosts"

const Main = () => {
  const { posts, isLoading } = useInfinitePosts({
    endpoint: "/posts",
    pageSize: 6,
  })

  const initialValueForm = {
    search: "",
  }

  const [form, setForm] = useState(initialValueForm)
  const navigate = useNavigate()

  function onChange(event) {
    const { value, name } = event.target
    setForm({ ...form, [name]: value })
  }

  function handleSearch(event) {
    event.preventDefault()
    console.log(event)
    navigate(`/search/${form.search}`)
  }

  return (
    <>
      <Container>
        <Title size="lg" align="center">
          Posts
        </Title>

        <Search onSubmit={handleSearch}>
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Buscar"
            icon={FiSearch}
            onChange={onChange}
          />
          <Button type="submit">Buscar</Button>
        </Search>

        <Items>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </Items>

        {isLoading && <LoadingMessage>Carregando mais posts...</LoadingMessage>}
        {isLoading && (
          <LoadingSkeletonGrid>
            {Array.from({ length: 3 }).map((_, index) => (
              <LoadingSkeletonCard key={`main-skeleton-${index}`} />
            ))}
          </LoadingSkeletonGrid>
        )}
      </Container>
    </>
  )
}

export default Main
