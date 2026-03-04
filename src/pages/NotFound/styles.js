import styled from "styled-components"

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

  p {
    font-size: 4.2rem;
    font-weight: 400;
    color: var(--white-light);

    span {
      color: var(--blue-light);
    }
  }
`

export const Content = styled.div`
  width: 100%;
  max-width: 47rem;
  margin: 0 auto;

  p {
    font-size: 1.6rem;
    font-weight: 400;
    text-align: center;
    color: var(--gray-5);
    margin-bottom: 3.2rem;
  }
`
