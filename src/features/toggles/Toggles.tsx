import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteJson, getJson } from '../../api';
import {
    Heading1,
    PrimaryButton,
    SecondaryButton,
    WarningButton,
} from '../../components';
import { TeamContext } from '../teams';

interface Toggle {
    id: number;
    name: string;
    isToggled: boolean;
}

export const Toggles: React.FC = () => {
    const [toggles, setToggles] = useState<Toggle[]>([]);
    const [fetchToggles, setFetchToggles] = useState(false);
    const { teamName } = useParams();
    const { teams, refetch } = useContext(TeamContext);
    const teamId = teams.find((team) => team.name === teamName)?.id;
    const navigate = useNavigate();

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

    const onDeleteTeam = async () => {
        await deleteJson(`http://localhost:8080/team/${teamId}`);
        refetch();
        navigate('/');
    };

    return (
        <>
            <Heading1>Toggles for team {teamName}</Heading1>
            <div className='mx-auto my-5 flex justify-between'>
                <PrimaryButton onClick={() => navigate('new')}>
                    Create new toggle
                </PrimaryButton>
                <div>
                    <SecondaryButton
                        onClick={() => navigate(`/${teamName}/edit`)}
                    >
                        Edit team
                    </SecondaryButton>
                    <WarningButton onClick={() => onDeleteTeam()}>
                        Delete team
                    </WarningButton>
                </div>
            </div>
            <ul className='my-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                {toggles.map((toggle) => (
                    <li
                        className='rounded-md border border-slate-200 p-6 shadow-md font-semibold text-lg text-slate-800
                    hover:cursor-pointer flex justify-between'
                        key={toggle.id}
                        onClick={() => navigate(`edit/${toggle.id}`)}
                    >
                        <span>{toggle.name}</span>
                        <label
                            htmlFor={`toggle-${toggle.id}`}
                            className='relative cursor-pointer flex items-center'
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleClick(toggle);
                            }}
                        >
                            <input
                                type='checkbox'
                                id={`toggle-${toggle.id}`}
                                className='sr-only peer'
                                checked={toggle.isToggled}
                            />
                            <div className='w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[4px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600'></div>
                        </label>
                    </li>
                ))}
            </ul>
        </>
    );
};
