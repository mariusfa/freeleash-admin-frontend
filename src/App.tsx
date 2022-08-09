import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './features/header';
import {
    EditTeam,
    NewTeam,
    TeamContextProvider,
    Teams,
} from './features/teams';
import { NewToggle, Toggles } from './features/toggles';

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <TeamContextProvider>
                <Routes>
                    <Route path='/' element={<Teams />} />
                    <Route path='/new' element={<NewTeam />} />
                    <Route path='/:teamName/edit' element={<EditTeam />} />
                    <Route path='/:teamName/toggles' element={<Toggles />} />
                    <Route
                        path='/:teamName/toggles/new'
                        element={<NewToggle />}
                    />
                </Routes>
            </TeamContextProvider>
        </BrowserRouter>
    );
};

export default App;
