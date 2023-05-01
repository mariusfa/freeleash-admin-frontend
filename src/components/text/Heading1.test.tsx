import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Heading1 } from './Heading1';

describe('Heading1', () => {
    test('should render a heading with the text "Heading 1"', () => {
        render(<Heading1>Heading 1</Heading1>);

        const heading = screen.getByRole('heading');
        expect(heading).toBeDefined();
        expect(heading.textContent).toBe('Heading 1');
    });
});