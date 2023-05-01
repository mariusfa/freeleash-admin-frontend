interface Props {
    children: React.ReactNode;
    id: string;
    name: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
}

export const RadioButton: React.FC<Props> = ({ children, name, ...rest }) => {
    return (
        <div className='mb-2'>
            <input
                {...rest}
                type='radio'
                name={name}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300'
            />
            <label
                htmlFor={name}
                className='ml-2 text-sm font-medium text-gray-900'
            >
                {children}
            </label>
        </div>
    );
};
