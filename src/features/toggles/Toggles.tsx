import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetData, useSendData } from '../../api';
import {
    Heading1,
    PrimaryButton,
    SecondaryButton,
    WarningButton,
} from '../../components';
import { TeamContext } from '../teams';
import { Toggle } from './types';

export const Toggles: React.FC = () => {
    const { teamName } = useParams();
    const { teams, refetch: refetchTeams } = useContext(TeamContext);
    const teamId = teams.find((team) => team.name === teamName)?.id;
    const navigate = useNavigate();
    const { sendData, isError: isErrorDelete, isSubmitting } = useSendData();
    const { sendData: updateToggle, isError: isUpdateError } = useSendData();

    const {
        data: toggles,
        isLoading,
        isError,
        refetch: refetchToggles,
    } = useGetData<Toggle[]>(
        `http://localhost:8080/toggle?team=${teamName}`,
        [],
        20000
    );

    const toggleClick = async ({ id, isToggled, ...rest }: Toggle) => {
        const { error } = await updateToggle(
            `http://localhost:8080/toggle/${id}`,
            'PUT',
            { ...rest, isToggled: !isToggled }
        );
        if (!error) {
            refetchToggles();
        }
    };

    const onDeleteTeam = async () => {
        const { error } = await sendData(
            `http://localhost:8080/team/${teamId}`,
            'DELETE'
        );
        if (!error) {
            refetchTeams();
            navigate('/');
        }
    };

    if (isError) {
        return <div>Error getting toggles</div>;
    }

    if (isLoading) {
        return <div>Loading toggles</div>;
    }

    return (
        <>
            <Heading1>Toggles for team {teamName}</Heading1>
            {isErrorDelete && <div>Error deleting team</div>}
            {isUpdateError && <div>Error updating toggle</div>}
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
                    <WarningButton
                        disabled={isSubmitting}
                        onClick={() => onDeleteTeam()}
                    >
                        {isSubmitting ? 'Deleting...' : 'Delete team'}
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
                                readOnly
                            />
                            <div className='w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[4px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600'></div>
                        </label>
                    </li>
                ))}
            </ul>
        </>
    );
};
