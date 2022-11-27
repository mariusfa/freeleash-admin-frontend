interface Props {
    children: React.ReactNode;
}
export const ErrorFieldMessage: React.FC<Props> = ({ children }) => {
    return (
        <p className='mt-2 text-sm text-red-600 dark:text-red-500 font-medium'>
            {children}
        </p>
    );
};
