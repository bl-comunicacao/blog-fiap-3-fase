import styled from "styled-components"

export const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  max-width: 96rem;
  margin: 0 auto;

  .form-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    div {
      max-width: 100%;
    }
  }

  .actions {
    display: flex;
    gap: 1.6rem;
    margin-top: 0.8rem;
  }
`
