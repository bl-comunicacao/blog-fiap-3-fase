import { Container, Title, Button } from "../../components/Ui"
import { Post } from "../../components"
import { Input } from "../../components/Ui"
import { FiSearch } from "react-icons/fi"
import { useState } from "react"

import { useNavigate, useParams } from "react-router-dom"
import { useInfinitePosts } from "../../hooks"
import { DEFAULT_POSTS_PAGE_SIZE } from "../../constants/pagination"

const Search = () => {
  const { word_search } = useParams()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState(word_search || "")
  const { posts: results, isLoading, hasMorePosts } = useInfinitePosts({
    endpoint: `/posts/search?q=${encodeURIComponent(word_search || "")}`,
    pageSize: DEFAULT_POSTS_PAGE_SIZE,
    resetKey: word_search,
  })

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    if (!searchValue.trim()) return
    navigate(`/search/${encodeURIComponent(searchValue.trim())}`)
  }

  return (
    <Container>
      <Title className="text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem] xl:text-[3.6rem] text-center">
        Resultado da busca
      </Title>

      <form className="w-full flex justify-center mt-10 gap-[1.6rem] mb-[6.4rem]" onSubmit={handleSearchSubmit}>
        <Input
          type="text"
          name="search"
          id="search"
          placeholder="Buscar"
          icon={FiSearch}
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <Button type="submit">Buscar</Button>
      </form>

      <div className="w-full flex flex-wrap gap-[3.2rem] max-[800px]:flex-col max-[800px]:gap-[3.2rem]">
        {results.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>

      {isLoading && <p className="w-full text-center mt-[2.4rem] text-[1.6rem] text-[var(--white-dark)]">Carregando mais posts...</p>}
      {!isLoading && hasMorePosts && results.length > 0 && (
        <div className="w-full text-center mt-[2.4rem]">
          <p className="text-[1.4rem] text-[var(--gray-6)]">
            Existem mais resultados para carregar. Continue rolando.
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
              key={`search-skeleton-${index}`}
              className="w-[calc(33.333%-2.2rem)] min-h-[18rem] border border-[rgba(255,255,255,0.08)] rounded-[0.8rem] bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0.05)_75%)] bg-[length:200%_100%] animate-pulse max-[1100px]:w-[calc(50%-1.6rem)] max-[800px]:w-full"
            />
          ))}
        </div>
      )}

      <div className="w-full text-center mt-[6.4rem]">
        <Button to="/">Voltar para home</Button>
      </div>
    </Container>
  )
}

export default Search
