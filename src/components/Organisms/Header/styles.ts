import styled from "styled-components"

export const Container = styled.header`
  width: 100vw;
  height: 5rem;
  border-bottom: 1px solid var(--borders);
  background-color: var(--shape);

  .logo {
    font-size: 32px;
    background: -webkit-linear-gradient(var(--primary), var(--primary-darker));
    filter: brightness(1.3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: uppercase;
    font-style: italic;
    font-weight: bold;
  }
`

export const Content = styled.div`
  max-width: 1180px;
  height: 5rem;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  section {
    display: flex;
    gap: 1rem;
    height: 5rem;

    nav {
      display: flex;
      gap: 1rem;
    }

    a {
      margin-top: 1.75rem;
      text-decoration: none;
      color: var(--gray);
      filter: brightness(0.5);
      transition: all 0.2s ease-in-out;
      &:hover {
        filter: brightness(1);
        border-bottom: 3px solid var(--primary);
      }
      &.active {
        filter: brightness(1);
        border-bottom: 3px solid var(--primary);
      }
    }
  }
`
