import Title from "../../components/Ui/Title"
import Button from "../../components/Ui/Button"

import { PostContainer, PostActions } from "./styles"

import { useParams } from "react-router-dom"
import usePostById from "../../hooks/usePostById"

const Post = () => {
  const { idPost } = useParams()
  const { post } = usePostById(idPost)

  return (
    <>
      <PostContainer>
        <span className="date">
          {post?.created_at
            ? new Date(post.created_at).toLocaleDateString("pt-BR")
            : "-"}
        </span>
        <span className="category">{post?.author_name || "Sem autor"}</span>

        <Title size="xl" align="center">
          {post?.title}
        </Title>

        <p>{post?.content}</p>
      </PostContainer>

      <PostActions>
        <Button to="/">Voltar para home</Button>
      </PostActions>
    </>
  )
}

export default Post
