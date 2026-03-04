import { PostContainer } from "./styles"
import { Link } from "react-router-dom"

const Post = ({ post }) => {
  return (
    <Link to={`/post/${post.id}`}>
      <PostContainer>
        <div className="description">
          <span className="date">{post.date}</span>
          <span className="category">{post.category}</span>

          <h3 className="title">{post.title}</h3>
          <p className="resume">{post.resume}</p>
        </div>
      </PostContainer>
    </Link>
  )
}

export default Post
