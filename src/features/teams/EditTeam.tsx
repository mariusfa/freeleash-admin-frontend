import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TeamContext } from './TeamContextProvider';
import { Form, Field } from 'react-final-form';
import { useSendData } from '../../api';
import { Heading1, InputText, Label, PrimaryButton } from '../../components';
import { required } from '../../validation/validation';

export const EditTeam: React.FC = () => {
    const { teamName } = useParams();
    const { teams, refetch } = useContext(TeamContext);
    const team = teams.find((team) => team.name === teamName);
    const navigate = useNavigate();
    const { sendData, isError, isSubmitting } = useSendData();

    if (team?.id === undefined) {
        return <p>Could not find team by team name: {teamName}</p>;
    }

    const onSubmit = async (values: any) => {
        const { error } = await sendData(
            `http://localhost:8080/team/${team?.id}`,
            'PUT',
            values
        );
        if (!error) {
            refetch();
            navigate(`/${values.name}/toggles`);
        }
    };

    return (
        <>
            <Heading1>Edit team</Heading1>
            {isError && <div>Error updating team</div>}
            <Form
                initialValues={{ name: team.name }}
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
                            {isSubmitting ? 'Submitting...' : 'Edit team'}
                        </PrimaryButton>
                    </form>
                )}
            />
        </>
    );
};
