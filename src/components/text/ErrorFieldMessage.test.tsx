import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ErrorFieldMessage } from './ErrorFieldMessage';

describe('ErrorFieldMessage', () => {
    test('should render a paragraph with the text "Error Message"', () => {
        render(<ErrorFieldMessage>Error Message</ErrorFieldMessage>);

        const paragraph = screen.getByText('Error Message');
        expect(paragraph).toBeDefined();
        expect(paragraph.textContent).toBe('Error Message');
    });
});
