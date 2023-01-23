import { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
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
import { Conditions } from '../../components/conditions/Conditions';
import { required } from '../../validation/validation';
import { Condition, Content, mapToConditionsDTO, ToggleDTO, ToggleForm } from './types';

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
    const [initialValues, setInitialValues] = useState<ToggleForm | object>({});

    const {
        data: toggle,
        isLoading,
        isError,
    } = useGetData<ToggleDTO | null>(
        `http://localhost:8080/toggle/${toggleId}`,
        null
    );

    useEffect(() => {
        const getInitialValues = (toggle: ToggleDTO | null): ToggleForm => {
            return {
                name: toggle?.name ?? '',
                operator: toggle?.operator ?? 'AND',
                conditions: toggle?.conditions.map((condition): Condition => {
                    return {
                        field: condition.field,
                        operator: condition.operator,
                        id: uuidv4(),
                        contents: condition.contents.map((content): Content => {
                            return {
                                id: uuidv4(),
                                value: content
                            }
                        })
                    }
                }) ?? [],
            };
        };
        setInitialValues(getInitialValues(toggle))
    }, [toggle]);

    if (isError) {
        return <div>Error getting toggle with id: ${toggleId}</div>;
    }

    if (isLoading) {
        return <Spinner />;
    }

    const onSubmit = async (values: ToggleForm) => {
        const { error } = await updateToggle(
            `http://localhost:8080/toggle/${toggleId}`,
            'PUT',
            {
                operator: values.operator,
                name: values.name,
                isToggled: toggle?.isToggled ?? false,
                conditions: mapToConditionsDTO(values.conditions),
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
                initialValues={initialValues}
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <form className='w-fit mx-auto' onSubmit={handleSubmit}>
                        <Label htmlFor='name'>Toggle name</Label>
                        <Field name='name' validate={required}>
                            {({ input, meta }) => (
                                <InputText id='name' {...input} meta={meta} />
                            )}
                        </Field>
                        <Conditions />
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
