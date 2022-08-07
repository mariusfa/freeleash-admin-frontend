import React, { createContext, useEffect, useState } from 'react';
import { getJson } from '../../api';
import { Team } from './types';

export interface TeamContextInterface {
    teams: Team[];
    refetch: () => void;
}

export const TeamContext = createContext<TeamContextInterface>({
    teams: [],
    refetch: () => null,
});

interface Props {
    children: React.ReactNode;
}

export const TeamContextProvider: React.FC<Props> = ({ children }) => {
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        const getTeams = async () => {
            const data = await getJson('http://localhost:8080/team');
            setTeams(data);
        };
        getTeams();
        setShouldRefetch(false);
    }, [shouldRefetch]);
    return (
        <TeamContext.Provider
            value={{ teams: teams, refetch: () => setShouldRefetch(true) }}
        >
            {children}
        </TeamContext.Provider>
    );
};
