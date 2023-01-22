import { useContext, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useSendData } from '../../api';
import { mapToConditions } from '../../api/conditionsMap';
import {
    ErrorMessage,
    Heading1,
    InputText,
    Label,
    PrimaryButton
} from '../../components';
import { Conditions } from '../../components/conditions/Conditions';
import { ConditionId } from '../../components/conditions/types';
import { required } from '../../validation/validation';
import { TeamContext } from '../teams';

export const NewToggle: React.FC = () => {
    const navigate = useNavigate();
    const { teams } = useContext(TeamContext);
    const { teamName } = useParams();
    const teamId = teams.find((team) => team.name === teamName)?.id;
    const { sendData, isError, isSubmitting } = useSendData();
    const [conditionIds, setConditionIds] = useState<ConditionId[]>([]);

    if (teamId === undefined) {
        return <p>error: could not find team: {teamName}</p>;
    }

    const onSubmit = async (values: any) => {
        const { error } = await sendData(
            'http://localhost:8080/toggle',
            'POST',
            {
                teamId,
                isToggled: false,
                operator: values.operator,
                conditions: mapToConditions(values, conditionIds),
                name: values.name,
            }
        );
        if (!error) {
            navigate(`/${teamName}/toggles`);
        }
    };

    return (
        <>
            <Heading1>Create toggle</Heading1>
            {isError && <ErrorMessage>Error submitting new team</ErrorMessage>}
            <Form
                initialValues={{ operator: 'AND' }}
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <form className='w-fit mx-auto' onSubmit={handleSubmit}>
                        <Label htmlFor='name'>Name</Label>
                        <Field name='name' validate={required}>
                            {({ input, meta }) => (
                                <InputText id='name' {...input} meta={meta} />
                            )}
                        </Field>
                        <Conditions
                            conditionIds={conditionIds}
                            setConditionIds={setConditionIds}
                        />
                        <PrimaryButton type='submit' disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Create toggle'}
                        </PrimaryButton>
                    </form>
                )}
            />
        </>
    );
};
