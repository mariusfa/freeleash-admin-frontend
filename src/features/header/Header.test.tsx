import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
    test('should render a header with the text "Freeleash"', () => {
        render(<BrowserRouter><Header /></BrowserRouter>);

        const header = screen.getByText('Freeleash');
        expect(header).toBeDefined();
    });

    test('should have a link with the correct "to" property', () => {
        render(<BrowserRouter><Header /></BrowserRouter>);

        const link = screen.getByRole('link', { name: 'Freeleash' });
        expect(link.getAttribute('href')).toBe('/');
    });
});
