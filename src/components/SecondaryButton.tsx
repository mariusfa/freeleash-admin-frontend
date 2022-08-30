interface Props {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const SecondaryButton: React.FC<Props> = ({ children, ...rest }) => {
    return (
        <button
            className='my-2 rounded-full py-2 px-4 text-sm font-semibold bg-white text-blue-600 
        hover:bg-slate-100 w-fit border border-blue-600'
            {...rest}
        >
            {children}
        </button>
    );
};
