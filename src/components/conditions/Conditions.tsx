import React from 'react';
import { ToggleOperator } from '../../features/toggles/ToggleOperator';
import { ConditionItem } from './ConditionItem';
import { v4 as uuidv4 } from 'uuid';
import { useField } from 'react-final-form';
import { Condition, Content } from '../../features/toggles/types';
import { SecondaryButton } from '../buttons/SecondaryButton';

export const Conditions: React.FC = () => {
    const { input } = useField<Condition[]>('conditions');
    const conditions: Condition[] = input.value;

    const addCondition = () => {
        const emptyConditon: Condition = {
            id: uuidv4(),
            field: '',
            operator: 'IN',
            contents: [
                {
                    id: uuidv4(),
                    value: '',
                },
            ],
        };
        input.onChange(conditions.concat(emptyConditon));
    };

    const removeCondition = (id: string) => {
        input.onChange(conditions.filter((condition) => condition.id !== id));
    };

    return (
        <>
            {conditions.length > 0 && <ToggleOperator />}
            <ul>
                {conditions.map((condition, index) => (
                    <li key={condition.id}>
                        <ConditionItem
                            condition={condition}
                            conditionIndex={index}
                            removeCondition={removeCondition}
                        />
                    </li>
                ))}
            </ul>
            <SecondaryButton
                className='block'
                type='button'
                onClick={addCondition}
            >
                Add condition (optional)
            </SecondaryButton>
        </>
    );
};
