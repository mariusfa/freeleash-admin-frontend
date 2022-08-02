import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJson } from '../../api';

export interface Team {
    id: number,
    name: string
}

export const Teams: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        const getTeams = async () => {
            const teams = await getJson('http://localhost:8080/team')
            setTeams(teams)
        }
        getTeams()
    }, []);

    return (
        <div>
            <h2>Teams</h2>
            <Link to={'new'}>Create new team</Link>
            <ul>
                {teams.map((team) => (
                    <li key={team.id}><Link to={team.name.toString()}>{team.name}</Link></li>
                ))}
            </ul>
        </div>
    );
}
