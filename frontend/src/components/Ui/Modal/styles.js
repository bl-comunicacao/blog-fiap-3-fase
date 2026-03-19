import styled from "styled-components"

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(3, 7, 18, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem;
  z-index: 999;
`

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 48rem;
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.8rem;
  padding: 2.4rem;
`

export const Title = styled.h3`
  margin: 0 0 1.2rem;
  font-size: 2rem;
  font-weight: 500;
  color: var(--white-light);
`

export const Message = styled.p`
  margin: 0;
  font-size: 1.6rem;
  line-height: 1.5;
  color: var(--gray-5);
`

export const Actions = styled.div`
  margin-top: 2.4rem;
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`
