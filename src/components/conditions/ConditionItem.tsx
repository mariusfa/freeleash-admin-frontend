import { Field, useField } from 'react-final-form';
import { Condition, Content } from '../../features/toggles/types';
import { required } from '../../validation/validation';
import { InputText } from '../InputText';
import { Label } from '../Label';
import { SecondaryButton } from '../SecondaryButton';
import { ConditionOperator } from './ConditionOperator';
import { v4 as uuidv4 } from 'uuid';
import { Contents } from './Contents';
import { TertiaryButton } from '../TertiaryButton';

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
    return (
        <div className='rounded-md border border-slate-200 p-6 shadow-md mb-4'>
            <div className='flex justify-between'>
                <Label htmlFor={`conditions[${conditionIndex}].field`}>
                    Condition name
                </Label>
                <TertiaryButton
                    onClick={() => removeCondition(condition.id)}
                >
                    Remove
                </TertiaryButton>
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
            <Contents conditionIndex={conditionIndex} />
        </div>
    );
};
