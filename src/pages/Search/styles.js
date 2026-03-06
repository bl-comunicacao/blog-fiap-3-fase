import styled from "styled-components"

export const Items = styled.div`
  display: flex;
  gap: 6.4rem;

  @media (max-width: 800px) {
    flex-direction: column;
    gap: 3.2rem;
  }
`

export const PostActions = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 6.4rem;
`
