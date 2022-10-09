interface Props {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: 'submit' | 'button'
}

export const PrimaryButton: React.FC<Props> = ({ children, ...rest }) => {
    return (
        <button
            className='my-2 rounded-full py-2 px-4 text-sm font-semibold bg-blue-600 text-white 
        hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100
        w-fit border border-blue-600'
            {...rest}
        >
            {children}
        </button>
    );
};
