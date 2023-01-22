import { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useGetData, useSendData } from '../../api';
import { mapToConditions } from '../../api/conditionsMap';
import {
    ErrorMessage,
    Heading1,
    InputText,
    Label,
    PrimaryButton,
    Spinner,
    WarningButton
} from '../../components';
import { Conditions } from '../../components/conditions/Conditions';
import { ConditionId } from '../../components/conditions/types';
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
    const [conditionIds, setConditionIds] = useState<ConditionId[]>([]);
    const [initialValues, setInitialValues] = useState<any>({});

    const {
        data: toggle,
        isLoading,
        isError,
    } = useGetData<Toggle | null>(
        `http://localhost:8080/toggle/${toggleId}`,
        null
    );

    useEffect(() => {
        const getConditionIds = (toggle: Toggle | null): ConditionId[] => {
            return (
                toggle?.conditions.map((condition) => {
                    return {
                        id: uuidv4(),
                        contentIds: condition.contents.map((content) =>
                            uuidv4()
                        ),
                    };
                }) ?? []
            );
        };

        setConditionIds(getConditionIds(toggle));
    }, [toggle]);

    useEffect(() => {
        const getInitialValues = (toggle: Toggle | null) => {
            console.log(toggle);
            console.log(conditionIds);

            let values: any = {};
            values.name = toggle?.name;
            values.operator = toggle?.operator;
            toggle?.conditions.forEach((condition, index) => {
                values[`condition-${conditionIds[index].id}`] = condition.field;
                values[`condition-operator-${conditionIds[index].id}`] =
                    condition.operator;
                condition.contents.forEach((content, contentIndex) => {
                    values[
                        `content-${conditionIds[index].contentIds[contentIndex]}`
                    ] = content;
                });
            });
            return values;
        };
        setInitialValues(getInitialValues(toggle));
    }, [conditionIds]);

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
                operator: values.operator,
                name: values.name,
                isToggled: toggle?.isToggled ?? false,
                conditions: mapToConditions(values, conditionIds)
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

    // useEffect(() => {
    //     // const getInitialValues = (toggle: Toggle | null) => {
    //     //     let values: any = {};
    //     //     values.name = toggle?.name;
    //     //     values.operator = toggle?.operator;
    //     //     let conditions: ConditionId[] = [];
    //     //     toggle?.conditions.forEach((condition) => {
    //     //         let conditionValue: ConditionId = {
    //     //             id: uuidv4(),
    //     //             contentIds: [],
    //     //         };
    //     //         values[`condition-${conditionValue.id}`] = condition.field;
    //     //         values[`condition-operator-${conditionValue.id}`] =
    //     //             condition.operator;
    //     //         condition.contents.forEach((content) => {
    //     //             const contentId = uuidv4();
    //     //             conditionValue.contentIds.push(contentId);
    //     //             values[`content-${contentId}`] = content;
    //     //         });
    //     //         conditions.push(conditionValue);
    //     //     });
    //     //     setConditionIds(conditionIds)
    //     //     return values;
    //     // };

    //     const getConditionIds = (toggle: Toggle | null): ConditionId[] | undefined => {
    //         return toggle?.conditions.map(condition => {
    //             return {
    //                 id: uuidv4(),
    //                 contentIds: condition.contents.map(content => uuidv4())
    //             }
    //         })
    //     }
    //     const conditionIds = getConditionIds(toggle)
    //     setConditionIds(getConditionIds(toggle))
    // }, []);

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
                        <Conditions
                            conditionIds={conditionIds}
                            setConditionIds={setConditionIds}
                        />
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
