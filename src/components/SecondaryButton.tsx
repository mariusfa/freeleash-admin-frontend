export const SecondaryButton: React.FC<
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
> = ({ children, className, ...rest }) => {
    return (
        <button
            className={`my-2 rounded-full py-2 px-4 text-sm font-semibold bg-white text-blue-600 hover:bg-slate-100 w-fit border border-blue-600 ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
};
