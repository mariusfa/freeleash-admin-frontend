import { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteJson, getJson, putJson } from '../../api';
import {
    Heading1,
    InputText,
    Label,
    PrimaryButton,
    WarningButton,
} from '../../components';
import { Toggle } from './types';

export const EditToggle: React.FC = () => {
    const { teamName, toggleId } = useParams();
    const navigate = useNavigate();
    const [toggle, setToggle] = useState<Toggle | null>(null);

    const onSubmit = async (values: any) => {
        await putJson(`http://localhost:8080/toggle/${toggleId}`, {
            operator: 'AND',
            isToggled: false,
            conditions: [],
            ...values,
        });
        navigate(`/${teamName}/toggles`);
    };

    const onDelete = async () => {
        await deleteJson(`http://localhost:8080/toggle/${toggleId}`);
        navigate(`/${teamName}/toggles`);
    };

    useEffect(() => {
        const getToggle = async () => {
            const data = await getJson(
                `http://localhost:8080/toggle/${toggleId}`
            );
            setToggle(data);
        };
        getToggle();
    }, [toggle, toggleId]);

    return (
        <>
            <Heading1>Edit toogle: {toggle?.name}</Heading1>
            <Form
                initialValues={{
                    name: toggle?.name,
                }}
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <form className='w-fit mx-auto' onSubmit={handleSubmit}>
                        <Label htmlFor='name'>Toggle name</Label>
                        <Field name='name'>
                            {({ input }) => <InputText id='name' {...input} />}
                        </Field>
                        <div className='flex justify-between flex-row'>
                            <PrimaryButton type='submit'>
                                Edit toggle
                            </PrimaryButton>
                            <WarningButton onClick={() => onDelete()}>
                                Delete
                            </WarningButton>
                        </div>
                    </form>
                )}
            />
        </>
    );
};
