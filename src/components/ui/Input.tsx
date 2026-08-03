interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className = "", ...rest }: Props) => {
  return (
    <input
      {...rest}
      className={`w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-sm text-gray-900 shadow-2xs transition-all placeholder:text-gray-400 focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${className}`}
    />
  );
};

export default Input;
