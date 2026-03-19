const Input = ({ icon: Icon, ...props }) => {
  const hasIcon = Boolean(Icon)
  const inputClass = `w-full h-[4.8rem] text-[1.6rem] text-[var(--white-light)] bg-[var(--black-light)] border-0 rounded px-[1.6rem] transition duration-300 focus:outline-none placeholder:text-[1.4rem] placeholder:text-[var(--white-light)] placeholder:opacity-40 ${
    hasIcon ? "pl-[4.8rem]" : ""
  }`

  if (!hasIcon) {
    return <input className={inputClass} {...props} />
  }

  return (
    <div className="relative w-full max-w-[46rem]">
      <span className="absolute left-[1.6rem] top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none text-[var(--blue-light)] [&>svg]:w-[2.2rem] [&>svg]:h-[2.2rem]">
        <Icon />
      </span>

      <input className={inputClass} {...props} />
    </div>
  )
}

export default Input
