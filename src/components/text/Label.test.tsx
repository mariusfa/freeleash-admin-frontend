import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Label } from './Label';

describe('Label', () => {
    test('should render a label with the text "First Name"', () => {
        render(<Label htmlFor='firstName'>First Name</Label>);

        const label = screen.getByText('First Name');
        expect(label).toBeDefined();
    });
});