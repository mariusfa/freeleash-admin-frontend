import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TeamContext } from './TeamContextProvider';
import { Form, Field } from 'react-final-form';
import { putJson } from '../../api';

export const EditTeam: React.FC = () => {
    const { teamName } = useParams();
    const { teams, refetch } = useContext(TeamContext);
    const teamId = teams.find((team) => team.name === teamName)?.id;
    const navigate = useNavigate();

    if (teamId === undefined) {
        return <p>Could not find team by team name: {teamName}</p>;
    }

    const onSubmit = async (values: any) => {
        await putJson(`http://localhost:8080/team/${teamId}`, { ...values });
        refetch();
        navigate(`/${values.name}/toggles`);
    };

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <h2>Edit team</h2>
                    <label>Team name</label>
                    <Field name='name' component='input' placeholder='name' />
                    <button type='submit'>Edit team</button>
                </form>
            )}
        />
    );
};
