import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { TeamContext } from './TeamContextProvider';
import { Form, Field } from 'react-final-form';

export const EditTeam: React.FC = () => {
    const { teamName } = useParams();
    const { teams, refetch } = useContext(TeamContext);
    const teamToEdit = teams.find((team) => team.name === teamName);

    if (teamToEdit === undefined) {
        return <p>Could not find team by team name: {teamName}</p>;
    }

    const onSubmit = async (values: any) => {
        console.log('submit');
        const editedTeam = { ...teamToEdit, ...values };
        //put data here
        refetch();
        //navigate here
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
