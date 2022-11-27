import { Field, Form } from 'react-final-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetData, useSendData } from '../../api';
import {
    ErrorMessage,
    Heading1,
    InputText,
    Label,
    PrimaryButton,
    Spinner,
    WarningButton,
} from '../../components';
import { required } from '../../validation/validation';
import { Toggle } from './types';

export const EditToggle: React.FC = () => {
    const { teamName, toggleId } = useParams();
    const navigate = useNavigate();
    const {
        sendData: updateToggle,
        isError: isUpdateError,
        isSubmitting: isUpdateSubmitting,
    } = useSendData();
    const {
        sendData: deleteToggle,
        isError: isDeleteError,
        isSubmitting: isDeleteSubmitting,
    } = useSendData();

    const {
        data: toggle,
        isLoading,
        isError,
    } = useGetData<Toggle | null>(
        `http://localhost:8080/toggle/${toggleId}`,
        null
    );

    if (isError) {
        return <div>Error getting toggle with id: ${toggleId}</div>;
    }

    if (isLoading) {
        return <Spinner />;
    }

    const onSubmit = async (values: any) => {
        const { error } = await updateToggle(
            `http://localhost:8080/toggle/${toggleId}`,
            'PUT',
            {
                operator: 'AND',
                isToggled: false,
                conditions: [],
                ...values,
            }
        );
        if (!error) {
            navigate(`/${teamName}/toggles`);
        }
    };

    const onDelete = async () => {
        const { error } = await deleteToggle(
            `http://localhost:8080/toggle/${toggleId}`,
            'DELETE'
        );
        if (!error) {
            navigate(`/${teamName}/toggles`);
        }
    };

    return (
        <>
            <Heading1>Edit toogle: {toggle?.name}</Heading1>
            {isUpdateError && (
                <ErrorMessage>Error updating toggle</ErrorMessage>
            )}
            {isDeleteError && (
                <ErrorMessage>Error deleting toggle</ErrorMessage>
            )}
            <Form
                initialValues={{
                    name: toggle?.name,
                }}
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <form className='w-fit mx-auto' onSubmit={handleSubmit}>
                        <Label htmlFor='name'>Toggle name</Label>
                        <Field name='name' validate={required}>
                            {({ input, meta }) => (
                                <InputText id='name' {...input} meta={meta} />
                            )}
                        </Field>
                        <div className='flex justify-between flex-row'>
                            <PrimaryButton
                                disabled={isUpdateSubmitting}
                                type='submit'
                            >
                                {isUpdateSubmitting
                                    ? 'Submitting...'
                                    : 'Edit toggle'}
                            </PrimaryButton>
                            <WarningButton
                                disabled={isDeleteError}
                                onClick={() => onDelete()}
                            >
                                {isDeleteSubmitting ? 'Deleting...' : 'Delete'}
                            </WarningButton>
                        </div>
                    </form>
                )}
            />
        </>
    );
};
