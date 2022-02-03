import styled from '@emotion/styled';

export const Form = styled.form`
    max-width: 600px;
    width: 95%;
    margin: 5rem auto 0 auto;

    fieldset{
        margin: 2rem 0;
        border: 1px solid #e1e1e1;
        font-size: 2rem;
        padding: 2rem;
    }
    legend{
        font-weight: bold;
        color: var(--naranja);
    }
`;

export const Campo = styled.div`
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    label {
        flex: 0 0 150px;
        font-size: 1.8rem;
    }
    input, textarea {
        flex: 1;
        padding: 1rem;
        border-radius: 10px;
        border: 1px solid #e1e1e1;
        font-size: 1.8rem;
    }
`;

export const Submmit = styled.input`
    margin-top: 4rem;
    background-color: var(--naranja);
    padding: 1.5rem;
    width: 100%;
    text-align: center;
    color: #fff;
    text-transform: uppercase;
    font-size: 2.5rem;
    border: none;
    border-radius: 10px;
    font-family: 'Bebas Neue', cursive;
    &:hover {
        background-color: var(--gris);
        cursor: pointer;
    }
`;

export const Error = styled.p`
    background-color: red;
    padding: 1rem;
    font-size: 1.9rem;
    color: #fff;
    text-align: center;
    font-family: 'Bebas Neue', cursive;
    font-weight: normal;
    text-transform: uppercase;
    margin-top: 2rem;
    border-radius: 8px;
`;