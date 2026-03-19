import { useCallback, useEffect, useRef, useState } from "react"
import api from "../services/api"
import {
  DEFAULT_POSTS_PAGE_SIZE,
  DEFAULT_SCROLL_OFFSET,
} from "../constants/pagination"

export default function useInfinitePosts({
  endpoint,
  pageSize = DEFAULT_POSTS_PAGE_SIZE,
  scrollOffsetResolver = DEFAULT_SCROLL_OFFSET,
  resetKey,
}) {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMorePosts, setHasMorePosts] = useState(true)
  const hasUserScrolledRef = useRef(false)
  const isLoadingRef = useRef(false)
  const hasNextPageRef = useRef(true)
  const pageRef = useRef(1)

  const buildUrl = useCallback((nextPage) => {
    const separator = endpoint.includes("?") ? "&" : "?"
    return `${endpoint}${separator}page=${nextPage}&limit=${pageSize}`
  }, [endpoint, pageSize])

  const loadPosts = useCallback(async (nextPage, reset = false) => {
    if (isLoadingRef.current || (!hasNextPageRef.current && !reset)) return

    isLoadingRef.current = true
    setIsLoading(true)

    try {
      const response = await api.get(buildUrl(nextPage))
      const payload = response.data

      if (Array.isArray(payload)) {
        const nextPosts = payload.slice(0, nextPage * pageSize)
        setPosts(nextPosts)
        const hasNext = nextPosts.length < payload.length
        hasNextPageRef.current = hasNext
        setHasMorePosts(hasNext)
        pageRef.current = nextPage
        return
      }

      const data = payload?.data || []
      const pagination = payload?.pagination

      setPosts((prevPosts) => (reset ? data : [...prevPosts, ...data]))
      const hasNext = Boolean(pagination?.hasNextPage)
      hasNextPageRef.current = hasNext
      setHasMorePosts(hasNext)
      pageRef.current = nextPage
    } finally {
      isLoadingRef.current = false
      setIsLoading(false)
    }
  }, [buildUrl, pageSize])

  const resetAndLoad = useCallback(() => {
    hasUserScrolledRef.current = false
    isLoadingRef.current = false
    hasNextPageRef.current = true
    setHasMorePosts(true)
    pageRef.current = 1
    setPosts([])
    loadPosts(1, true)
  }, [loadPosts])

  useEffect(() => {
    resetAndLoad()
  }, [endpoint, pageSize, resetAndLoad, resetKey])

  useEffect(() => {
    const handleScroll = () => {
      if (isLoadingRef.current || !hasNextPageRef.current) return

      const scrollTop = window.scrollY
      if (scrollTop > 0) hasUserScrolledRef.current = true
      if (!hasUserScrolledRef.current) return

      const viewportHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const threshold = scrollOffsetResolver(viewportHeight)

      if (scrollTop + viewportHeight >= documentHeight - threshold) {
        loadPosts(pageRef.current + 1)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loadPosts, scrollOffsetResolver])

  const removePostById = useCallback((id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
  }, [])

  return {
    posts,
    isLoading,
    hasMorePosts,
    removePostById,
    reload: resetAndLoad,
  }
}
