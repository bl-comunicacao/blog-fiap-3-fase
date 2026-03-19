import styled from "styled-components"
import { keyframes } from "styled-components"

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
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

export const PostActions = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 6.4rem;
`

export const LoadingMessage = styled.p`
  width: 100%;
  text-align: center;
  margin-top: 2.4rem;
  font-size: 1.6rem;
  color: var(--white-dark);
`

export const LoadingSkeletonGrid = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 3.2rem;
  margin-top: 1.6rem;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`

export const LoadingSkeletonCard = styled.div`
  width: calc(33.333% - 2.2rem);
  min-height: 18rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.8rem;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(255, 255, 255, 0.05) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.2s infinite linear;

  @media (max-width: 1100px) {
    width: calc(50% - 1.6rem);
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`
