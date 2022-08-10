import { useContext, useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getJson, putJson } from '../../api';
import { TeamContext } from '../teams';

export const EditToggle: React.FC = () => {
    const { teamName, toggleId } = useParams();
    const { teams } = useContext(TeamContext);
    const teamId = teams.find((team) => team.name === teamName)?.id;
    const navigate = useNavigate();
    const [toggleToEdit, setToggleToEdit] = useState({});

    useEffect(() => {
        const getToggle = async () => {
            const data = await getJson(
                `http://localhost:8080/toggle/${toggleId}`
            );
            setToggleToEdit(data);
        };
        getToggle();
    }, []);

    const onSubmit = async (values: any) => {
        await putJson(`http://localhost:8080/toggle/${toggleId}`, {
            ...values,
            isToggled: false,
        });
        navigate(`/${teamName}/toggles`);
    };

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <h2>Edit toogle</h2>
                    <label>Toggle name</label>
                    <Field name='name' component='input' placeholder='name' />
                    <button type='submit'>Edit toggle</button>
                </form>
            )}
        />
    );
};
