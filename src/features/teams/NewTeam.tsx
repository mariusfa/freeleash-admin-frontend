import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSendData } from '../../api';
import { sendDataType } from '../../api/useSendData';
import { NewTeamForm } from './NewTeamForm';
import { TeamContext } from './TeamContextProvider';

const submitTeam = async (values: any, sendData: sendDataType, refetch: () => void, navigate: (url: string) => void) => {
    const { error } = await sendData(
        'http://localhost:8080/team',
        'POST',
        values
    );
    if (!error) {
        refetch();
        navigate(`/${values.name}/toggles`);
    }
};

export const NewTeam: React.FC = () => {
    const { refetch } = useContext(TeamContext);
    const navigate = useNavigate();
    const { sendData, isSubmitting, isError } = useSendData();

    const onSubmit = async (values: any) => {
        await submitTeam(values, sendData, refetch, navigate);
    };

    return (
        <NewTeamForm onSubmit={onSubmit} isSubmitting={isSubmitting} isError={isError} />
    );
};
