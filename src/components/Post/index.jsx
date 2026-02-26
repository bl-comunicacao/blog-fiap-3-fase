import { PostContainer } from "./styles"

const Post = () => {
  return (
    <PostContainer>
      <img src="" alt="" />
      <span>Tecnologia</span>
      <h3>O guia definitivo para desenvolvedores</h3>
      <p>
        Este artigo apresenta as melhores práticas e dicas para desenvolvedores
        em tecnologia.
      </p>

      <div>
        <div className="profile">
          <img src="" alt="" />
        </div>
        <div>
          <h6>João Silva</h6>
          <p>Publicado em 24/03/2026</p>
        </div>
      </div>
    </PostContainer>
  )
}

export default Post
