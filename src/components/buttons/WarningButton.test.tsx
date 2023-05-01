import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { WarningButton } from './WarningButton';

describe ('WarningButton', () => {
    test('should render a button with the text "Click Me"', () => {
        render(<WarningButton>Click Me</WarningButton>);

        const button = screen.getByRole('button');
        expect(button).toBeDefined();
        expect(button.textContent).toBe('Click Me');
    });
});