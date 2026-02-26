import { Container, Items } from "./styles"

import Post from "../Post"

const Article = () => {
  return (
    <>
      <Container>
        <Items>
          <Post />
          <Post />
          <Post />
        </Items>
      </Container>
    </>
  )
}

export default Article
