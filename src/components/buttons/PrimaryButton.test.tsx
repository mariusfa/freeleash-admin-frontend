import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { PrimaryButton } from './PrimaryButton';

describe ('PrimaryButton', () => {
    test('should render a button with the text "Click Me"', () => {
        render(<PrimaryButton>Click Me</PrimaryButton>);

        const button = screen.getByRole('button');
        expect(button).toBeDefined();
        expect(button.textContent).toBe('Click Me');
    });
});
