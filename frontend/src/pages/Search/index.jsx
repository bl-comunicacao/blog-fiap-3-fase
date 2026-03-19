import Container from "../../components/Ui/Container"
import Title from "../../components/Ui/Title"
import Button from "../../components/Ui/Button"
import Post from "../../components/Post"

import {
  Items,
  PostActions,
  LoadingMessage,
  LoadingSkeletonGrid,
  LoadingSkeletonCard,
} from "./styles"

import { useParams } from "react-router-dom"
import useInfinitePosts from "../../hooks/useInfinitePosts"

const Search = () => {
  const { word_search } = useParams()
  const { posts: results, isLoading } = useInfinitePosts({
    endpoint: `/posts/search?q=${encodeURIComponent(word_search || "")}`,
    pageSize: 6,
    resetKey: word_search,
  })

  return (
    <Container>
      <Title size="lg" align="center">
        Resultado da busca
      </Title>

      <Items>
        {results.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Items>

      {isLoading && <LoadingMessage>Carregando mais posts...</LoadingMessage>}
      {isLoading && (
        <LoadingSkeletonGrid>
          {Array.from({ length: 3 }).map((_, index) => (
            <LoadingSkeletonCard key={`search-skeleton-${index}`} />
          ))}
        </LoadingSkeletonGrid>
      )}

      <PostActions>
        <Button to="/">Voltar para home</Button>
      </PostActions>
    </Container>
  )
}

export default Search
