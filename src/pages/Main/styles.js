import styled from "styled-components"

export const Search = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1.6rem;
  margin-bottom: 6.4rem;
`

export const Items = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 3.2rem;

  @media (max-width: 800px) {
    flex-direction: column;
    gap: 3.2rem;
  }
`
