import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetData, useSendData } from '../../api';
import {
    ErrorMessage,
    Heading1,
    PrimaryButton,
    SecondaryButton,
    Spinner,
} from '../../components';
import { TeamContext } from '../teams';
import { DeleteTeamModal } from '../teams/DeleteTeamModal';
import { ToggleDTO } from './types';

export const Toggles: React.FC = () => {
    const { teamName } = useParams();
    const { teams, refetch: refetchTeams } = useContext(TeamContext);
    const teamId = teams.find((team) => team.name === teamName)?.id;
    const navigate = useNavigate();
    const { sendData: updateToggle, isError: isUpdateError } = useSendData();

    const {
        data: toggles,
        isLoading,
        isError,
        refetch: refetchToggles,
    } = useGetData<ToggleDTO[]>(
        `http://localhost:8080/toggle?team=${teamName}`,
        [],
        20000
    );

    const toggleClick = async ({ id, ...rest }: ToggleDTO) => {
        const { error } = await updateToggle(
            `http://localhost:8080/toggle/${id}`,
            'PUT',
            {
                ...rest,
                isToggled: !rest.isToggled,
            }
        );
        if (!error) {
            refetchToggles();
        }
    };

    if (!teamId || !teamName) {
        return <ErrorMessage>Could not find team:{teamName}</ErrorMessage>;
    }

    if (isError) {
        return <ErrorMessage>Failed getting toggles</ErrorMessage>;
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <Heading1>Toggles for team {teamName}</Heading1>
            {isUpdateError && (
                <ErrorMessage>Updating toggle failed</ErrorMessage>
            )}
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
                    <DeleteTeamModal teamId={teamId} teamName={teamName} />
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
                            }}
                        >
                            <input
                                type='checkbox'
                                id={`toggle-${toggle.id}`}
                                className='sr-only peer'
                                checked={toggle.isToggled}
                                readOnly
                                onClick={() => toggleClick(toggle)}
                            />
                            <div className='w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[4px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600'></div>
                        </label>
                    </li>
                ))}
            </ul>
        </>
    );
};
