import { render, screen } from '@testing-library/react';
import { describe, test, vi, expect } from 'vitest';
import { NewTeamForm } from './NewTeamForm';

describe('NewTeamForm', () => {
    test('renders form with input and button', () => {
        render(
            <NewTeamForm
                onSubmit={vi.fn()}
                isSubmitting={false}
                isError={false}
            />
        );

        expect(screen.getByLabelText('Team name')).toBeDefined();
        expect(screen.getByRole('button')).toBeDefined();
    });
});