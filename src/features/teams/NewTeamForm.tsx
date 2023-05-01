import { Field, Form } from 'react-final-form';
import { ErrorMessage, Heading1, InputText, Label, PrimaryButton } from '../../components';
import { required } from '../../validation/validation';

interface Props {
    onSubmit: (values: any) => Promise<void>;
    isSubmitting: boolean;
    isError: boolean;
}

export const NewTeamForm: React.FC<Props> = ({ onSubmit, isSubmitting, isError }) => {
    return (
        <>
            <Heading1>Create team</Heading1>
            {isError && <ErrorMessage>Creating new team failed</ErrorMessage>}
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <form className='w-fit mx-auto' onSubmit={handleSubmit}>
                        <Label htmlFor='name'>Team name</Label>
                        <Field name='name' validate={required}>
                            {({ input, meta }) => (
                                <InputText id='name' {...input} meta={meta} />
                            )}
                        </Field>
                        <PrimaryButton disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Create team'}
                        </PrimaryButton>
                    </form>
                )}
            ></Form>
        </>
    );
};