const Button = ({
  children,
  ...props
}: React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>) => (
  <button
    type="button"
    className="border border-black font-bold block px-2 py-1 enabled:hover:bg-black enabled:hover:text-white focus:bg-black focus:text-white disabled:border-slate-400 disabled:text-slate-400 outline-none"
    {...props}
  >
    {children}
  </button>
);

export default Button;
