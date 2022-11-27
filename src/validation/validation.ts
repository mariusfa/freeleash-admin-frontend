export const required = (value: string) =>
    value && value.trim().length > 0 ? undefined : 'Required';
