import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postJson } from '../../api';

interface FormData {
    name: string;
}

export const NewTeam: React.FC = () => {
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
        navigate(`/${formData.name}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create team</h2>
            <label htmlFor='name'>Team name</label>
            <input
                type='text'
                id='name'
                name='name'
                onChange={handleOnChange}
                value={formData.name}
            />
            <button>Create team</button>
        </form>
    );
};
