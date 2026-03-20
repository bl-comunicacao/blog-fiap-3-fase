import { useEffect, useState } from "react"
import api from "../services/api"

export default function usePostById(idPost) {
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      setIsLoading(true)
      try {
        const response = await api.get(`/posts/${idPost}`)
        if (isMounted) setPost(response.data)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    if (idPost) load()

    return () => {
      isMounted = false
    }
  }, [idPost])

  return { post, isLoading }
}
