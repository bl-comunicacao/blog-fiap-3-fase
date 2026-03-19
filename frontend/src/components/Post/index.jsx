import { Link } from "react-router-dom"
import { FiEdit, FiTrash2 } from "react-icons/fi"

const Post = ({ post, onDelete, showActions = false }) => {
  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString("pt-BR")
    : "-"
  const excerpt = post.content ? `${post.content.slice(0, 120)}...` : ""

  return (
    <div className="w-full max-w-[41.6rem] border border-[var(--black-light)] rounded max-[800px]:max-w-full">
      <Link to={`/post/${post.id}`} className="postLink">
        <div className="p-[1.8rem]">
          <span className="block uppercase tracking-[0.2rem] font-normal text-[1.2rem] text-[var(--gray-4)] mb-[0.8rem]">{formattedDate}</span>
          <span className="block uppercase tracking-[0.2rem] font-normal text-[1.8rem] text-[var(--blue-light)] mb-[1.6rem]">{post.author_name || "Sem autor"}</span>

          <h3 className="text-[2.4rem] font-normal text-[var(--white-light)] mb-[0.8rem]">{post.title}</h3>
          <p className="text-[1.6rem] font-light text-[var(--gray-5)] mb-0">{excerpt}</p>
        </div>
      </Link>

      {showActions && (
        <div className="flex gap-[0.8rem] mb-[1.6rem] px-[1.6rem]">
          <Link
            to={`/edit-post/${post.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="flex items-center justify-center w-[3.2rem] h-[3.2rem] border-0 rounded bg-[var(--black-light)] text-[var(--blue-light)] transition hover:-translate-y-[2px]"
              onClick={(e) => e.stopPropagation()}
            >
              <FiEdit className="w-[1.8rem] h-[1.8rem]" />
            </button>
          </Link>

          <button
            className="flex items-center justify-center w-[3.2rem] h-[3.2rem] border-0 rounded bg-[var(--black-light)] text-[#ef4444] transition hover:-translate-y-[2px]"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onDelete(post.id)
            }}
          >
            <FiTrash2 className="w-[1.8rem] h-[1.8rem]" />
          </button>
        </div>
      )}
    </div>
  )
}

export default Post
