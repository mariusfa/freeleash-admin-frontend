import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
    test('renders children', () => {
        render(<ErrorMessage>Test</ErrorMessage>);
        expect(screen.getByText('Test')).toBeDefined();
    });
});
