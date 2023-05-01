import { Field } from 'react-final-form';
import { Condition } from '../../features/toggles/types';
import { required } from '../../validation/validation';
import { InputText } from '../text/InputText';
import { Label } from '../text/Label';
import { ConditionOperator } from './ConditionOperator';
import { Contents } from './Contents';

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
            <Contents conditionIndex={conditionIndex} />
        </>
    );
};
