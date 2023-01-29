import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSendData } from '../../api';
import { WarningButton } from '../../components';
import { TeamContext } from './TeamContextProvider';

export const DeleteTeamModal: React.FC = () => {
    const { teamName } = useParams();
    const { teams, refetch: refetchTeams } = useContext(TeamContext);
    const teamId = teams.find((team) => team.name === teamName)?.id;
    const { sendData, isError: isErrorDelete, isSubmitting } = useSendData();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <WarningButton onClick={() => openModal()}>
                Delete team
            </WarningButton>
            {isModalOpen && (
                <div
                    id='popup-modal'
                    className='fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 md:h-full bg-black bg-opacity-40'
                >
                    <div className='relative w-full h-full max-w-md mx-auto'>
                        <div className='relative bg-white rounded-lg shadow'>
                            <button
                                type='button'
                                className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                                onClick={() => closeModal()}
                            >
                                <svg
                                    aria-hidden='true'
                                    className='w-5 h-5'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        fill-rule='evenodd'
                                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                        clip-rule='evenodd'
                                    ></path>
                                </svg>
                                <span className='sr-only'>Close modal</span>
                            </button>
                            <div className='p-6 text-center'>
                                <svg
                                    aria-hidden='true'
                                    className='mx-auto mb-4 text-gray-400 w-14 h-14 '
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        stroke-width='2'
                                        d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                    ></path>
                                </svg>
                                <h3 className='mb-5 text-lg font-normal text-gray-500'>
                                    Are you sure you want to delete this team?
                                </h3>
                                <button
                                    data-modal-hide='popup-modal'
                                    type='button'
                                    className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'
                                >
                                    Yes, I'm sure
                                </button>
                                <button
                                    data-modal-hide='popup-modal'
                                    type='button'
                                    className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10'
                                    onClick={() => closeModal()}
                                >
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
