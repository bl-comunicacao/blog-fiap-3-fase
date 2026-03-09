import styled from "styled-components"

const sizes = {
  sm: "1.6rem",
  md: "2.4rem",
  lg: "3.6rem",
  xl: "4.8rem",
}

export const StyledTitle = styled.h1`
  font-size: ${({ $size }) => sizes[$size] || sizes.md};
  font-weight: 400;
  text-align: ${({ $align }) => $align || "left"};
  margin-bottom: 3.2rem;

  p {
    font-size: 1.4rem;
    color: var(--gray-5);
    margin-top: 0.4rem;
  }
`
