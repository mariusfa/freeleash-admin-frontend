interface Props {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const WarningButton: React.FC<Props> = ({ children, ...rest }) => {
    return (
        <button
            type='button'
            className='my-2 rounded-full py-2 px-4 text-sm font-semibold bg-red-700 text-white 
        hover:text-slate-100 hover:bg-red-800 active:bg-red-600 active:text-blue-100
        w-fit border border-red-700'
            {...rest}
        >
            {children}
        </button>
    );
};
