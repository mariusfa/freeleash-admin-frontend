import { createContext, useEffect, useState } from 'react';
import { getJson } from '../../api';
import { Team } from './types';

export interface TeamContextInterface {
    teams: Team[];
}

export const TeamContext = createContext<TeamContextInterface>({
    teams: [],
});

interface Props {
    children: React.ReactNode;
}

export const TeamContextProvider: React.FC<Props> = ({ children }) => {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        const getTeams = async () => {
            const data = await getJson('http://localhost:8080/team');
            setTeams(data);
        };
        getTeams();
    }, []);
    return (
        <TeamContext.Provider value={{ teams: teams }}>
            {children}
        </TeamContext.Provider>
    );
};
