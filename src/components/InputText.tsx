import { FieldMetaState } from 'react-final-form';
import { ErrorFieldMessage } from './ErrorFieldMessage';

interface Props {
    id: string;
    name: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    meta: FieldMetaState<any>;
}

export const InputText: React.FC<Props> = ({ meta, ...rest }) => {
    return (
        <div>
            <input
                {...rest}
                type='text'
                className='mx-auto px-3 py-2 block border border-gray-500 bg-gray-50 text-sm rounded-md focus:outline-none focus:border-blue-500 focus:ring-blue-500'
                autoFocus={true}
            />
            {meta.error && meta.touched && (
                <ErrorFieldMessage>{meta.error}</ErrorFieldMessage>
            )}
        </div>
    );
};
