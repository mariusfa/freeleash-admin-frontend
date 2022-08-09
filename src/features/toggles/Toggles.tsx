import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getJson } from '../../api';

interface Toggle {
    id: number;
    name: string;
    isToggled: boolean;
}

export const Toggles: React.FC = () => {
    const [toggles, setToggles] = useState<Toggle[]>([]);
    const [fetchToggles, setFetchToggles] = useState(false);
    const { teamName } = useParams();

    useEffect(() => {
        const getToggles = async () => {
            const data = await getJson(
                `http://localhost:8080/toggle?team=${teamName}`
            );
            setToggles(data);
            setFetchToggles(false);
        };
        getToggles();

        const interval = setInterval(() => {
            getToggles();
        }, 5000);
        return () => clearInterval(interval);
    }, [teamName, fetchToggles]);

    const toggleClick = async ({ id, name, isToggled }: Toggle) => {
        await fetch(`http://localhost:8080/toggle/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, isToggled: !isToggled }),
        });
        setFetchToggles(true);
    };

    return (
        <>
            <h2>Toggles for team {teamName}</h2>
            <Link to={`/${teamName}/edit`}>Edit team</Link>
            <br />
            <Link to={'new'}>Create new toggle</Link>
            <ul>
                {toggles.map((toggle) => (
                    <li key={toggle.id}>
                        <span>
                            {toggle.name}
                            {' is '}
                            {toggle.isToggled ? 'ON ' : 'OFF '}
                        </span>
                        <button onClick={() => toggleClick(toggle)}>
                            toggle
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
};
