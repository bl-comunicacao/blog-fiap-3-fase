import { TextareaWrapper, StyledTextarea } from "./styles"

const Textarea = ({ icon: Icon, ...props }) => {
  const hasIcon = Boolean(Icon)

  if (!hasIcon) {
    return <StyledTextarea {...props} />
  }

  return (
    <TextareaWrapper>
      <IconContainer>
        <Icon />
      </IconContainer>

      <StyledTextarea $hasIcon {...props} />
    </TextareaWrapper>
  )
}

export default Textarea
