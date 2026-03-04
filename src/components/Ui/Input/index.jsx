import { InputWrapper, StyledInput, IconContainer } from "./styles"

const Input = ({ icon: Icon, ...props }) => {
  const hasIcon = Boolean(Icon)

  if (!hasIcon) {
    return <StyledInput {...props} />
  }

  return (
    <InputWrapper>
      <IconContainer>
        <Icon />
      </IconContainer>

      <StyledInput $hasIcon {...props} />
    </InputWrapper>
  )
}

export default Input
