import { FieldMetaState } from 'react-final-form';
import { ErrorFieldMessage } from './ErrorFieldMessage';

interface Props {
    id: string;
    name: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    meta: FieldMetaState<any>;
    className?: string | undefined
}

export const InputText: React.FC<Props> = ({ meta, className, ...rest }) => {
    return (
        <div>
            <input
                {...rest}
                type='text'
                className={`px-3 py-2 block border border-gray-500 bg-gray-50 text-sm rounded-md focus:outline-none focus:border-blue-500 focus:ring-blue-500 ${className}`}
            />
            {meta.error && meta.touched && (
                <ErrorFieldMessage>{meta.error}</ErrorFieldMessage>
            )}
        </div>
    );
};

