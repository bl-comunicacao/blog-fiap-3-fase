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

export const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  max-width: 38rem;
  margin: 0 auto;
`
