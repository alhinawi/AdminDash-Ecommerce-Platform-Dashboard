interface Props {
  msg: string;
}

const ErrorMessage = ({ msg }: Props) => {
  return msg && <span className="text-xs text-red-500">{msg}</span>;
};

export default ErrorMessage;
