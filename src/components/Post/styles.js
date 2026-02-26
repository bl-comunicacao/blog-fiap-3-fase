import styled from "styled-components"

export const PostContainer = styled.div`
  span {
    font-size: 1.4rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    color: var(--blue-light);
    margin-bottom: 0.8rem;
    display: inline-block;
  }

  h3 {
    font-size: 2.4rem;
    font-weight: 600;
    color: var(--white);
    margin-bottom: 0.8rem;
  }

  p {
    font-size: 1.6rem;
    font-weight: 300;
    color: var(--white);
    margin-bottom: 3.2rem;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    .profile {
      width: 4.8rem;
      height: 4.8rem;
      border-radius: 50%;
      overflow: hidden;
      background-color: #151b26;
    }

    h6 {
      font-size: 1.4rem;
      font-weight: 500;
      color: var(--blue-light);
    }

    p {
      font-size: 1.2rem;
      font-weight: 300;
      color: var(--white);
      margin-bottom: 0;
    }
  }
`
