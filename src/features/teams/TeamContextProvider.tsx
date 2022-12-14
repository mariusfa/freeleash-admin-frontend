import React, { createContext } from 'react';
import { useGetData } from '../../api';
import { Team } from './types';

export interface TeamContextInterface {
    teams: Team[];
    refetch: () => void;
    isLoading: boolean;
    isError: boolean;
}

export const TeamContext = createContext<TeamContextInterface>({
    teams: [],
    refetch: () => null,
    isLoading: true,
    isError: false,
});

interface Props {
    children: React.ReactNode;
}

export const TeamContextProvider: React.FC<Props> = ({ children }) => {
    const {
        data: teams,
        refetch,
        isLoading,
        isError,
    } = useGetData<Team[]>('http://localhost:8080/team', []);

    return (
        <TeamContext.Provider
            value={{
                teams: teams,
                isLoading: isLoading,
                isError: isError,
                refetch: refetch,
            }}
        >
            {children}
        </TeamContext.Provider>
    );
};
