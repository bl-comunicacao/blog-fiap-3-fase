import styled from "styled-components"

export const PostContainer = styled.div`
  width: 100%;
  text-align: center;

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

  .profile {
    width: 100%;
    margin: 6.4rem auto;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;

    .photo {
      width: 5.6rem;
      height: 5.6rem;
      background-color: var(--black-light);
      border-radius: 50%;
      flex-shrink: 0;
    }

    p {
      font-size: 1.8rem;
      font-weight: 400;
      color: var(--blue-light);
      white-space: nowrap;
    }
  }

  p {
    font-size: 1.6rem;
    font-weight: 300;
    color: var(--gray-5);
    margin-bottom: 0;
  }
`

export const PostActions = styled.div`
  width: 100%;
  text-align: center;
`
