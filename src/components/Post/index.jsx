import { PostContainer } from "./styles"

const Post = (props) => {
  return (
    <PostContainer>
      {/* <img src="" alt="" /> */}
      <span>{props.category}</span>
      <h3>{props.title}</h3>
      <p>{props.resume}</p>

      <div>
        <div className="profile">{/* <img src="" alt="" /> */}</div>
        <div>
          <h6>{props.author}</h6>
          <p>Publicado em {props.date}</p>
        </div>
      </div>
    </PostContainer>
  )
}

export default Post
