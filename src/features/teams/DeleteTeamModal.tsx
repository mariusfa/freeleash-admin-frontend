import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSendData } from '../../api';
import { ErrorMessage, SecondaryButton, WarningButton } from '../../components';
import { TeamContext } from './TeamContextProvider';

interface Props {
    teamId: number;
    teamName: string;
}

export const DeleteTeamModal: React.FC<Props> = ({ teamId, teamName }) => {
    const { refetch: refetchTeams } = useContext(TeamContext);
    const { sendData, isError: isErrorDelete, isSubmitting } = useSendData();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onDeleteTeam = async (id: number) => {
        const { error } = await sendData(
            `http://localhost:8080/team/${id}`,
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
                    className='fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 md:h-full bg-black bg-opacity-40'
                    onClick={closeModal}
                >
                    <div
                        className='relative w-full h-full max-w-md mx-auto'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='relative bg-white rounded-lg shadow'>
                            <button
                                type='button'
                                className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                                onClick={closeModal}
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
                                    Are you sure you want to delete this team:{' '}
                                    {teamName}?
                                    Connected toggles will be removed
                                </h3>
                                <WarningButton
                                    data-modal-hide='popup-modal'
                                    type='button'
                                    onClick={() => onDeleteTeam(teamId)}
                                    disabled={isSubmitting}
                                >
                                    Yes, I'm sure
                                </WarningButton>
                                <SecondaryButton
                                    data-modal-hide='popup-modal'
                                    type='button'
                                    onClick={closeModal}
                                >
                                    No, cancel
                                </SecondaryButton>
                                {isErrorDelete && <ErrorMessage>Deleting team failed</ErrorMessage>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
