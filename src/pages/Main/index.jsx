import Input from "../../components/Ui/Input"
import Button from "../../components/Ui/Button"
import Container from "../../components/Ui/Container"
import Title from "../../components/Ui/Title"
import { FiSearch } from "react-icons/fi"
import { Items, Search } from "./styles"

import api from "../../services/api"
import Post from "../../components/Post"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Main = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    api.get("/posts").then((response) => {
      setPosts(response.data)
    })
  }, [])

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
      </Container>
    </>
  )
}

export default Main
