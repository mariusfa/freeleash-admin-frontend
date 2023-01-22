import { ConditionId } from '../components/conditions/types';

export const mapToConditions = (values: any, conditionIds: ConditionId[]) =>
    conditionIds.map((condition) => {
        return {
            field: values[`condition-${condition.id}`],
            operator: values[`condition-operator-${condition.id}`],
            contents: condition.contentIds.map(
                (contentId) => values[`content-${contentId}`]
            ),
        };
    });
