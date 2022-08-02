import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './features/header';
import { NewTeam, Teams } from './features/teams';
import { NewToggle, Toggles } from './features/toggles';

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Teams />} />
                <Route path="/new" element={<NewTeam />} />
                <Route path="/:teamName" element={<Toggles />} />
                <Route path="/:teamName/new" element={<NewToggle />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
