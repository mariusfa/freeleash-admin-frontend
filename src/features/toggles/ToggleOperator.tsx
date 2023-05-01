import { Field } from 'react-final-form';
import { Label } from '../../components/text/Label';
import { RadioButton } from '../../components/buttons/RadioButton';

export const ToggleOperator: React.FC = () => {
    return (
        <>
            <Label>Toggle will be valid when:</Label>
            <Field name='operator' type='radio' value='AND'>
                {({ input }) => (
                    <RadioButton id='operator-all' {...input}>
                        All of conditions are met
                    </RadioButton>
                )}
            </Field>
            <Field name='operator' type='radio' value='OR'>
                {({ input }) => (
                    <RadioButton id='operator-one-of' {...input}>
                        At least one of the conditions are met
                    </RadioButton>
                )}
            </Field>
        </>
    );
};
