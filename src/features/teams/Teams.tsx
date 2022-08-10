import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TeamContext, TeamContextInterface } from './TeamContextProvider';

export const Teams: React.FC = () => {
    const { teams } = useContext(TeamContext);

    return (
        <div>
            <div className='flex'>
                <h2>Teams</h2>
                <Link to={'new'}>Create new team</Link>
            </div>
            <ul>
                {teams.map((team) => (
                    <li key={team.id}>
                        <Link to={`${team.name}/toggles`}>{team.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
