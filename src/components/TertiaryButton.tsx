
export const TertiaryButton: React.FC<
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
> = ({ children, className, ...rest }) => {
    return (
        <button
            className={`underline text-sm font-semibold bg-white hover:bg-slate-100 w-fit ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
};