import { Field } from 'react-final-form';
import { required } from '../../validation/validation';
import { InputText } from '../InputText';
import { Label } from '../Label';
import { SecondaryButton } from '../SecondaryButton';
import { ConditionOperator } from './ConditionOperator';
import { ConditionId } from './types';

interface Props {
    conditionId: ConditionId;
    removeCondition: (id: string) => void;
    addConditionContentId: (ConditionId: string) => void;
    removeConditionContentId: (ConditionId: string, contentId: string) => void;
}

export const Condition: React.FC<Props> = ({
    conditionId,
    removeCondition,
    addConditionContentId,
    removeConditionContentId,
}) => {

    return (
        <>
            <div>
                <Label htmlFor={`condition-${conditionId.id}`}>
                    Condition name
                </Label>
                <button
                    className='ml-5 underline'
                    onClick={() => removeCondition(conditionId.id)}
                >
                    Remove
                </button>
            </div>
            <Field name={`condition-${conditionId.id}`} validate={required}>
                {({ input, meta }) => (
                    <InputText
                        id={`condition-${conditionId.id}`}
                        {...input}
                        meta={meta}
                    />
                )}
            </Field>
            <ConditionOperator id={`condition-operator-${conditionId.id}`} />
            <ul className='mt-4'>
                <Label>Values to verify</Label>
                {conditionId.contentIds.map((contentId) => (
                    <li key={contentId} className='mb-2'>
                        <div className='flex'>
                            <Field name={`content-${contentId}`} validate={required}>
                                {({ input, meta }) => (
                                    <InputText
                                        id={`content-${contentId}`}
                                        {...input}
                                        meta={meta}
                                    />
                                )}
                            </Field>
                            {conditionId.contentIds.length > 1 && (
                                <button
                                    className='ml-5 underline'
                                    onClick={() =>
                                        removeConditionContentId(
                                            conditionId.id,
                                            contentId
                                        )
                                    }
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
                onClick={() => addConditionContentId(conditionId.id)}
            >
                Add value
            </SecondaryButton>
        </>
    );
};
