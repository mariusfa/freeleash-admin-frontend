export const WarningButton: React.FC<
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
> = ({ children, ...rest }) => {
    return (
        <button
            type='button'
            className='my-2 mx-1 rounded-full py-2 px-4 text-sm font-semibold bg-red-700 text-white 
        hover:text-slate-100 hover:bg-red-800 active:bg-red-600 active:text-blue-100
        w-fit border border-red-700'
            {...rest}
        >
            {children}
        </button>
    );
};
