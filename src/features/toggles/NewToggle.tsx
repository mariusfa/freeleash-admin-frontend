import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postJson } from '../../api';
import { TeamContext } from '../teams';

interface formData {
    name: string;
    teamId?: number;
}

export const NewToggle: React.FC = () => {
    const navigate = useNavigate();
    const { teams } = useContext(TeamContext);
    const { teamName } = useParams();
    const teamId = teams.find((team) => team.name === teamName)?.id;
    const [formData, setFormData] = useState<formData>({
        name: '',
        teamId: teamId,
    });

    if (teamId === null) {
        return <p>error: could not find team: {teamName}</p>;
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await postJson('http://localhost:8080/toggle', formData);
        navigate(`/${teamName}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
            <input
                type='text'
                id='name'
                name='name'
                onChange={handleOnChange}
                value={formData.name}
            />
            <button type='submit'>Create toggle</button>
        </form>
    );
};
