import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading1, PrimaryButton } from '../../components';
import { TeamContext } from './TeamContextProvider';

export const Teams: React.FC = () => {
    const { teams, isLoading, isError } = useContext(TeamContext);
    const navigate = useNavigate();

    if (isError) {
        return <div>Error</div>;
    }

    if (isLoading) {
        return <div>Loading</div>;
    }

    return (
        <div className='text-center'>
            <Heading1>Teams</Heading1>
            <PrimaryButton onClick={() => navigate('new')}>
                New team
            </PrimaryButton>
            <ul className='my-5 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6'>
                {teams.map((team) => (
                    <li
                        className='rounded-md border border-slate-200 p-6 shadow-md font-semibold text-lg text-slate-800
                        hover:cursor-pointer'
                        key={team.id}
                        onClick={() => navigate(`${team.name}/toggles`)}
                    >
                        {team.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
