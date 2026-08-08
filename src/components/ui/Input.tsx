interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className = "", ...rest }: Props) => {
  return (
    <input
      {...rest}
      className={`focus-accent w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-sm text-gray-900 shadow-2xs transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-slate-800 ${className}`}
    />
  );
};

export default Input;
