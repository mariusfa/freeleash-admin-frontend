/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

export const Header: React.FC = () => {
    return (
        <div
            css={css`
                padding: 1rem;
            `}
        >
           <h1>Freeleash</h1> 
        </div>
    );
}
