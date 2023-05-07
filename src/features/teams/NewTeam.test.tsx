
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { jsonWrapper } from '../../api/jsonWrapper';
import { LocationHelper } from '../../test/LocationHelper';
import { getJsonMock } from '../../test/__mocks__/getJson.mock';
import { sendDataMock } from '../../test/__mocks__/sendData.mock';
import { NewTeam } from './NewTeam';
import { TeamContextProvider } from './TeamContextProvider';

describe('NewTeam', () => {
    test('submit team', async () => {
        jsonWrapper.sendJson = sendDataMock;
        jsonWrapper.getJson = getJsonMock;
        render(
            <TeamContextProvider>
                <NewTeam />
                <LocationHelper />
            </TeamContextProvider>, { wrapper: BrowserRouter }
        );

        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'TeamTest');
        const button = screen.getByRole('button');
        await userEvent.click(button);
        expect(screen.getByTestId('location-display').textContent).toBe('/TeamTest/toggles');
    });
});
