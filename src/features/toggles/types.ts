export interface Condition {
    id: string;
    field: string;
    operator: string;
    contents: Content[];
}

export interface Content {
    id: string;
    value: string;
}

export interface ToggleForm {
    name: string;
    operator: string,
    conditions: Condition[]
}

export interface ToggleDTO {
    id: number;
    name: string;
    isToggled: boolean;
    operator: string;
    conditions: ConditionDTO[];
}

export interface ConditionDTO {
    field: string;
    operator: string;
    contents: string[]
}

export const mapToConditionsDTO = (conditions: Condition[]): ConditionDTO[] => conditions.map(condition => {
    return {
        field: condition.field,
        operator: condition.operator,
        contents: condition.contents.map(content => content.value)
    }
})