import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { SecondaryButton } from './SecondaryButton';

describe('SecondaryButton', () => {
    test('should render a button with the text "Click Me"', () => {
        render(<SecondaryButton>Click Me</SecondaryButton>);

        const button = screen.getByRole('button');
        expect(button).toBeDefined();
        expect(button.textContent).toBe('Click Me');
    });
});
