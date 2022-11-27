import { useContext } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useSendData } from '../../api';
import { Heading1, InputText, Label, PrimaryButton } from '../../components';
import { TeamContext } from '../teams';

export const NewToggle: React.FC = () => {
    const navigate = useNavigate();
    const { teams } = useContext(TeamContext);
    const { teamName } = useParams();
    const teamId = teams.find((team) => team.name === teamName)?.id;
    const { sendData, isError, isSubmitting } = useSendData();

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
                operator: 'AND',
                conditions: [],
                ...values,
            }
        );
        if (!error) {
            navigate(`/${teamName}/toggles`);
        }
    };

    return (
        <>
            <Heading1>Create toggle</Heading1>
            {isError && <div>Error submitting new team</div>}
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <form className='w-fit mx-auto' onSubmit={handleSubmit}>
                        <Label htmlFor='name'>Name</Label>
                        <Field name='name'>
                            {({ input }) => <InputText id='name' {...input} />}
                        </Field>
                        <PrimaryButton disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Create toggle'}
                        </PrimaryButton>
                    </form>
                )}
            />
        </>
    );
};
