import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TeamContext, TeamContextInterface } from './TeamContextProvider';

export const Teams: React.FC = () => {
    const { teams } = useContext(TeamContext);
    const navigate = useNavigate();

    return (
        <div className='text-center'>
            <h2 className='m-2 text-3xl tracking-tight text-slate-900'>
                Teams
            </h2>
            <button
                className='mx-auto my-2 rounded-full py-2 px-4 text-sm font-semibold bg-blue-600 text-white 
                hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100
                w-fit'
                onClick={() => navigate('new')}
            >
                New team
            </button>
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
