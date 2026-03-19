import { useEffect } from "react"

export default function useMountEffect(effect) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => effect(), [])
}
