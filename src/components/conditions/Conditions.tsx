import React from 'react';
import { SecondaryButton } from '../SecondaryButton';
import { ToggleOperator } from '../ToggleOperator';
import { Condition } from './Condition';
import { ConditionId } from './types';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    conditionIds: ConditionId[];
    setConditionIds: (value: React.SetStateAction<ConditionId[]>) => void;
}
export const Conditions: React.FC<Props> = ({
    conditionIds,
    setConditionIds,
    ...rest
}) => {
    const addNewCondition = () => {
        setConditionIds((prev: ConditionId[]) => [
            ...prev,
            { id: uuidv4(), contentIds: [uuidv4()] },
        ]);
    };

    const removeCondition = (id: string) => {
        setConditionIds((prev: ConditionId[]) =>
            prev.filter((condition) => condition.id !== id)
        );
    };

    const addConditionContentId = (conditionId: string) => {
        const updated = conditionIds.map((condition) => {
            if (condition.id !== conditionId) {
                return condition;
            }
            condition.contentIds.push(uuidv4());
            return condition;
        });
        setConditionIds(updated);
    };

    const removeConditionContentId = (
        conditionId: string,
        contentId: string
    ) => {
        const updated = conditionIds.map((condition) => {
            if (condition.id !== conditionId) {
                return condition;
            }
            const updatedContentIds = condition.contentIds.filter(
                (element) => element !== contentId
            );
            condition.contentIds = updatedContentIds;
            return condition;
        });

        setConditionIds(updated);
    };
    return (
        <>
            {conditionIds.length > 0 && <ToggleOperator />}
            <ul>
                {conditionIds.map((condition) => (
                    <li key={condition.id}>
                        <Condition
                            conditionId={condition}
                            removeCondition={removeCondition}
                            addConditionContentId={addConditionContentId}
                            removeConditionContentId={removeConditionContentId}
                        />
                    </li>
                ))}
            </ul>
            <SecondaryButton
                className='block'
                type='button'
                onClick={addNewCondition}
            >
                Add condition (optional)
            </SecondaryButton>
        </>
    );
};
