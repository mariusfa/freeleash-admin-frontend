import { Field, Form } from 'react-final-form';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteJson, putJson } from '../../api';
import {
    Heading1,
    InputText,
    Label,
    PrimaryButton,
    WarningButton,
} from '../../components';

export const EditToggle: React.FC = () => {
    const { teamName, toggleId } = useParams();
    const navigate = useNavigate();

    const onSubmit = async (values: any) => {
        await putJson(`http://localhost:8080/toggle/${toggleId}`, {
            ...values,
            isToggled: false,
        });
        navigate(`/${teamName}/toggles`);
    };

    const onDelete = async () => {
        await deleteJson(`http://localhost:8080/toggle/${toggleId}`);
        navigate(`/${teamName}/toggles`);
    };

    return (
        <>
            <Heading1>Edit toogle</Heading1>
            <Form
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
