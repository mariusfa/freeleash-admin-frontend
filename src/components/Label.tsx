interface Props {
    children: React.ReactNode;
    htmlFor?: string;
}

export const Label: React.FC<Props> = ({ children, ...props }) => {
    return (
        <label className='text-lg my-2 inline-block text-slate-800' {...props}>
            {children}
        </label>
    );
};
