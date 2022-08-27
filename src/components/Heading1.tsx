interface Props {
    children: React.ReactNode;
}

export const Heading1: React.FC<Props> = ({ children }) => {
    return (
        <h1 className='mb-5 text-3xl tracking-tight text-slate-900 text-center'>
            {children}
        </h1>
    );
};
