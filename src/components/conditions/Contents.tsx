import { Field, useField } from 'react-final-form';
import { v4 as uuidv4 } from 'uuid';
import { Content } from '../../features/toggles/types';
import { required } from '../../validation/validation';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { InputText } from '../text/InputText';
import { Label } from '../text/Label';

interface Props {
    conditionIndex: number;
}

export const Contents: React.FC<Props> = ({conditionIndex}) => {
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
            <ul className='mt-4'>
                <Label>Values to verify</Label>
                {contents && contents.map((content, contentIndex) => (
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
}
