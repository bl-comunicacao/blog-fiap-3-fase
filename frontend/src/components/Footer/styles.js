import styled from "styled-components"

export const FooterContainer = styled.footer`
  width: 100%;
  margin-top: 3.2rem;
  margin-bottom: 12.8rem;

  @media (max-width: 800px) {
    margin-bottom: 6.4rem;
  }
`

export const Container = styled.div`
  width: 100%;
  max-width: 144rem;
  margin: 0 auto;
  padding-left: 3.2rem;
  padding-right: 3.2rem;
`

export const Items = styled.div`
  width: 100%;
  display: flex;

  justify-content: center;

  p {
    font-size: 1.8rem;
    color: var(--white-light);
    margin: 6.4rem 0 3.2rem 0;
  }
`
