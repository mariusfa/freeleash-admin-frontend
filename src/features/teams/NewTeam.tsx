import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postJson } from '../../api';
import { Heading1, InputText, PrimaryButton } from '../../components';
import { Label } from '../../components/Label';
import { TeamContext } from './TeamContextProvider';

interface FormData {
    name: string;
}

export const NewTeam: React.FC = () => {
    const { refetch } = useContext(TeamContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: '',
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await postJson('http://localhost:8080/team', formData);
        refetch();
        navigate(`/${formData.name}/toggles`);
    };

    return (
        <>
            <Heading1>Create team</Heading1>
            <form className='w-fit mx-auto' onSubmit={handleSubmit}>
                <Label htmlFor='name'>Team name</Label>
                <InputText
                    id='name'
                    name='name'
                    onChange={handleOnChange}
                    value={formData.name}
                />
                <PrimaryButton>Create team</PrimaryButton>
            </form>
        </>
    );
};
