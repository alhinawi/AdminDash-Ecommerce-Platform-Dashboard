interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const ColorCircle = ({ color, style, className, ...rest }: Props) => {
  return (
    <span
      className={`block w-5 h-5 rounded-full cursor-pointer mb-1 transition-all duration-200 hover:ring-2 hover:ring-offset-1 ${className || ""}`}
      style={
        {
          backgroundColor: color,
          "--tw-ring-color": color,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    />
  );
};

export default ColorCircle;
