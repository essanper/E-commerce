import styled from "styled-components";

export const ButtonContainer = styled.button`
  text-transform: capitalize;
  font-size: 1.4rem;
  background: transparent;
  border: 0.1rem solid var(--lightGreen);
  border-color: ${props =>
    props.cart ? "var(--mainYellow)" : "var(--lightGreen)"};
  color: var(--lightGreen);
  color: ${props => (props.cart ? "var(--mainYellow)" : "var(--lightGreen)")};
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  outline-color: red;
  cursor: pointer;
  display: inline-block;
  margin: 0.2rem 0.5rem 0.2rem 0;
  transition: all 0.2s ease-in-out;
  font-family: 'Dosis', sans-serif;
  &:hover {
    background: var(--lightGreen);
    background: ${props =>
      props.cart ? "var(--mainYellow)" : "var(--lightGreen)"};
    color: ${props =>
      props.cart ? "var(--mainWhite)" : "var(--mainGreen)"};
  }
  &:focus {
    outline: none;
  }
`;
