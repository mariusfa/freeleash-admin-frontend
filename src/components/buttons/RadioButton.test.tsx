import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { RadioButton } from './RadioButton';

describe('RadioButton', () => {
    test('should render a radio button with the label text "Yes"', () => {
        render(
            <RadioButton id='yes' name='yes' value='yes' onChange={() => {}}>
                Yes
            </RadioButton>
        );

        const radioButton = screen.getByLabelText('Yes');
        expect(radioButton).toBeDefined();
    });
});
