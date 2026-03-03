import styled from "styled-components"

export const PostContainer = styled.div`
  width: 100%;
  max-width: 41.6rem;
  border: 0.1rem solid var(--black-light);
  border-radius: 0.4rem;

  .description {
    padding: 1.8rem;
  }

  span {
    font-weight: 400;
    text-transform: uppercase;
    display: block;
    letter-spacing: 0.2rem;

    &.date {
      font-size: 1.2rem;
      color: var(--gray-4);

      margin-bottom: 0.8rem;
    }

    &.category {
      font-size: 1.8rem;
      color: var(--blue-light);

      margin-bottom: 1.6rem;
    }
  }

  h3 {
    font-size: 2.4rem;
    font-weight: 400;
    color: var(--white-light);
    margin-bottom: 0.8rem;
  }

  p {
    font-size: 1.6rem;
    font-weight: 300;
    color: var(--gray-5);
    margin-bottom: 0;
  }
`
