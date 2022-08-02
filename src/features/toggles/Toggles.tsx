import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getJson } from '../../api';

interface Toggle {
    id: number,
    name: string,
    isToggled: boolean
}

export const Toggles: React.FC = () => {
    const [toggles, setToggles] = useState<Toggle[]>([]);
    const [fetchToggles, setFetchToggles] = useState(false);
    const { teamName } = useParams()

    useEffect(() => {
        const getToggles = async () => {
            const toggles = await getJson(`http://localhost:8080/toggle?team=${teamName}`)
            setToggles(toggles)
            setFetchToggles(false)
        }
        getToggles()
    }, [teamName, fetchToggles]);

    const toggleClick = async ({id, name, isToggled}: Toggle) => {
        await fetch(`http://localhost:8080/toggle/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({name: name, isToggled: !isToggled})
        })
        setFetchToggles(true)
    }
    
    return (
        <>
            <h2>Toggles for team {teamName}</h2>
            <Link to={'new'}>Create new toggle</Link>
            <ul>
                {toggles.map((toggle) => (
                    <li key={toggle.id}>
                        <span>
                            {toggle.name}{' is '}{toggle.isToggled ? 'ON ' : 'OFF ' }
                        </span>
                        <button onClick={() => toggleClick(toggle)}>toggle</button>
                    </li>
                ))}
            </ul>
        </>
    );
}
