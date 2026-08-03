interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  color: string;
  isSelected?: boolean;
}

const ColorCircle = ({
  color,
  isSelected,
  style,
  className = "",
  ...rest
}: Props) => {
  return (
    <span
      className={`mb-1 block h-5 w-5 cursor-pointer rounded-full transition-all duration-200 ease-out hover:scale-110 active:scale-90 ${
        isSelected
          ? "scale-110 shadow-sm ring-2 ring-offset-2"
          : "opacity-80 hover:opacity-100 hover:ring-2 hover:ring-offset-1"
      } ${className}`}
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
