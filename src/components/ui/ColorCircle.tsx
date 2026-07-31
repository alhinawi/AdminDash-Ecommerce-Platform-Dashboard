interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    color: string;
    onClick?: () => void;
}

const ColorCircle = ({ color, ...rest }: Props) => {
    return (
        <span
            className="block w-5 h-5 rounded-full cursor-pointer mb-1 transition-all duration-200  hover:ring-2 hover:ring-indigo-500 hover:ring-offset-1 active:scale-110 active:ring-3 "
            style={{ backgroundColor: color }}
            {...rest}
        />
    )
}

export default ColorCircle;