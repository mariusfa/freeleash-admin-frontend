import { useContext, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { postJson } from '../../api';
import { Heading1, InputText, PrimaryButton } from '../../components';
import { Label } from '../../components/Label';
import { TeamContext } from './TeamContextProvider';

export const NewTeam: React.FC = () => {
    const { refetch } = useContext(TeamContext);
    const navigate = useNavigate();

    const onSubmit = async (values: any) => {
        await postJson('http://localhost:8080/team', values);
        refetch();
        navigate(`/${values.name}/toggles`);
    };

    return (
        <>
            <Heading1>Create team</Heading1>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <form className='w-fit mx-auto' onSubmit={handleSubmit}>
                        <Label htmlFor='name'>Team name</Label>
                        <Field name='name'>
                            {({ input }) => <InputText id='name' {...input} />}
                        </Field>
                        <PrimaryButton>Create team</PrimaryButton>
                    </form>
                )}
            ></Form>
        </>
    );
};
