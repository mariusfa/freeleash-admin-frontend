import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { InputText } from './InputText';

describe('InputText', () => {
    test('should render an input with name "name"', () => {
        render(
            <InputText
                id='name'
                name='name'
                value='testing'
                onChange={() => {}}
                meta={{ error: '', touched: false }}
            />
        );

        const input = screen.getByRole('textbox');
        expect(input).toBeDefined();
        expect(input.getAttribute('value')).toBe('testing');
    });
});