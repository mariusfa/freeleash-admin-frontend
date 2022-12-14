import { useContext } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { useSendData } from '../../api';
import {
    ErrorMessage,
    Heading1,
    InputText,
    Label,
    PrimaryButton,
} from '../../components';
import { required } from '../../validation/validation';
import { TeamContext } from './TeamContextProvider';

export const NewTeam: React.FC = () => {
    const { refetch } = useContext(TeamContext);
    const navigate = useNavigate();
    const { sendData, isSubmitting, isError } = useSendData();

    const onSubmit = async (values: any) => {
        const { error } = await sendData(
            'http://localhost:8080/team',
            'POST',
            values
        );
        if (!error) {
            refetch();
            navigate(`/${values.name}/toggles`);
        }
    };

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
