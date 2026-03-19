const Title = ({  align, children, ...rest }) => {

  return (
    <h1
      className={` font-normal mb-[3.2rem] ${
        align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"
      } [&>p]:text-[1.4rem] [&>p]:text-[var(--gray-5)] [&>p]:mt-[0.4rem]`}
      {...rest}
    >
      {children}
    </h1>
  )
}

export default Title
