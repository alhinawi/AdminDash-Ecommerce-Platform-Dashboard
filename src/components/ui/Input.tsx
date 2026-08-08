interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className = "", ...rest }: Props) => {
  return (
    <input
      {...rest}
      className={`focus-accent w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50 px-3.5 py-2.5 text-sm text-gray-900 dark:text-white shadow-2xs transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none ${className}`}
    />
  );
};

export default Input;
