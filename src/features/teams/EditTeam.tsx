import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TeamContext } from './TeamContextProvider';
import { Form, Field } from 'react-final-form';
import { putJson } from '../../api';
import { Heading1, InputText, Label, PrimaryButton } from '../../components';

export const EditTeam: React.FC = () => {
    const { teamName } = useParams();
    const { teams, refetch } = useContext(TeamContext);
    const teamId = teams.find((team) => team.name === teamName)?.id;
    const navigate = useNavigate();

    if (teamId === undefined) {
        return <p>Could not find team by team name: {teamName}</p>;
    }

    const onSubmit = async (values: any) => {
        await putJson(`http://localhost:8080/team/${teamId}`, values);
        refetch();
        navigate(`/${values.name}/toggles`);
    };

    return (
        <>
            <Heading1>Edit team</Heading1>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <form className='w-fit mx-auto' onSubmit={handleSubmit}>
                        <Label htmlFor='name'>Team name</Label>
                        <Field name='name'>
                            {({ input }) => <InputText id='name' {...input} />}
                        </Field>
                        <PrimaryButton>Edit team</PrimaryButton>
                    </form>
                )}
            />
        </>
    );
};
