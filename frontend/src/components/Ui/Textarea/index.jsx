const Textarea = (props) => {
  return (
    <textarea
      className="w-full font-['Rubik',sans-serif] text-[1.6rem] text-[var(--white-light)] bg-[var(--black-light)] border-0 rounded p-[1.6rem] transition duration-300 focus:outline-none placeholder:font-['Rubik',sans-serif] placeholder:text-[1.4rem] placeholder:text-[var(--white-light)] placeholder:opacity-40"
      {...props}
    />
  )
}

export default Textarea
