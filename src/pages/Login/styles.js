import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  max-width: 144rem;
  margin: 0 auto;
  padding-left: 3.2rem;
  padding-right: 3.2rem;

  h1 {
    font-size: 2.4rem;
    font-weight: 400;
    text-align: center;
    margin-bottom: 3.2rem;
  }
`

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 6.4rem;

  img {
    width: 5.6rem;
    margin-bottom: 1.2rem;
  }

  h2 {
    font-size: 4.2rem;
    font-weight: 400;
    color: var(--white-light);
  }
`
