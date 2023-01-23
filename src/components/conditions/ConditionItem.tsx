import { Field, useField } from 'react-final-form';
import { Condition, Content } from '../../features/toggles/types';
import { required } from '../../validation/validation';
import { InputText } from '../InputText';
import { Label } from '../Label';
import { SecondaryButton } from '../SecondaryButton';
import { ConditionOperator } from './ConditionOperator';

import { v4 as uuidv4 } from 'uuid';

interface Props {
    condition: Condition;
    conditionIndex: number;
    removeCondition: (id: string) => void;
}

export const ConditionItem: React.FC<Props> = ({
    condition,
    conditionIndex,
    removeCondition,
}) => {
    const { input } = useField<Content[]>(
        `conditions[${conditionIndex}].contents`
    );
    const contents = input.value
    

    const addContent = () => {
        const emptyContent: Content = {
            id: uuidv4(),
            value: ''
        }
        input.onChange(input.value.concat(emptyContent))
    }

    const removeContent = (id: string) => {
        input.onChange(contents.filter(content => content.id !== id))
    }

    return (
        <>
            <div>
                <Label htmlFor={`conditions[${conditionIndex}].field`}>
                    Condition name
                </Label>
                <button
                    className='ml-5 underline'
                    onClick={() => removeCondition(condition.id)}
                >
                    Remove
                </button>
            </div>
            <Field
                name={`conditions[${conditionIndex}].field`}
                validate={required}
            >
                {({ input, meta }) => (
                    <InputText
                        id={`conditions[${conditionIndex}].field`}
                        {...input}
                        meta={meta}
                    />
                )}
            </Field>
            <ConditionOperator id={`conditions[${conditionIndex}].operator`} />
            <ul className='mt-4'>
                <Label>Values to verify</Label>
                {contents.map((content, contentIndex) => (
                    <li key={content.id} className='mb-2'>
                        <div className='flex'>
                            <Field
                                name={`conditions[${conditionIndex}].contents[${contentIndex}].value`}
                                validate={required}
                            >
                                {({ input, meta }) => (
                                    <InputText
                                        id={`conditions[${conditionIndex}].contents[${contentIndex}].value`}
                                        {...input}
                                        meta={meta}
                                    />
                                )}
                            </Field>
                            {contents.length > 1 && (
                                <button
                                    className='ml-5 underline'
                                    onClick={() => removeContent(content.id)}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            <SecondaryButton
                className='block'
                type='button'
                onClick={() => addContent()}
            >
                Add value
            </SecondaryButton>
        </>
    );
};
