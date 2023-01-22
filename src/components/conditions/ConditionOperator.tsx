import { Field } from 'react-final-form';
import { Label } from '../Label';

interface Props {
    id: string;
}

export const ConditionOperator: React.FC<Props> = ({ id }) => {
    return (
        <>
            <Label htmlFor={id}>
                The condition will be valid when input value is:
            </Label>
            <Field name={id} initialValue='IN'>
                {({ input }) => (
                    <select id={id} className='bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' {...input}>
                        <option value='IN'>Included in list of values</option>
                        <option value='NOT_IN'>
                            Excluded in list of values
                        </option>
                        <option value='GE'>
                            Greater or equal to the first value
                        </option>
                        <option value='LE'>
                            Lesser or equal to the first value
                        </option>
                    </select>
                )}
            </Field>
        </>
    );
};
