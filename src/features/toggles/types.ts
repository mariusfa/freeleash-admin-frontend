export interface Toggle {
    id: number;
    name: string;
    isToggled: boolean;
    operator: string,
    conditions: Condition[]
}

interface Condition {
    field: string,
    operator: string,
    contents: string[]
}
