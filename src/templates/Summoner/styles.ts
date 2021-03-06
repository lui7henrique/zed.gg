import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  overflow: normal;

  @media (max-width: 978px) {
    grid-template-columns: 1fr;
  }
`

export const Aside = styled.aside`
  margin-top: -4rem;

  @media (max-width: 978px) {
    margin-top: 0rem;
  }
`

export const AsideContent = styled.div`
  position: sticky;
  top: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

export const ProfileWrapper = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  background: ${({ theme }) => theme.colors.shape};
  padding: 1rem;

  @media (max-width: 978px) {
    background: transparent;
  }
`

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

export const Level = styled.h3`
  position: absolute;
  bottom: -15px;
  right: 42%;
  padding: 0.5rem;
  background: ${({ theme }) => theme.colors.shape};

  opacity: 1;
  border-radius: 50%;
  font-size: 14px;
`

export const Avatar = styled.img`
  width: 100%;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  user-select: none;
  -webkit-user-drag: none;
`

export const Nickname = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.title};
`

export const Ranks = styled.section`
  display: flex;
  flex-direction: column;

  background: ${({ theme }) => theme.colors.shape};
  width: 100%;
  border-radius: 5px;
`

export const Rank = styled.a`
  display: flex;
  gap: 1rem;
  width: 100%;
  align-items: center;
  padding: 1rem;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.shapeHover};
    transition: all 0.2s ease-in-out;
  }

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`

export const RankIcon = styled.img`
  width: 55px;
  height: 55px;
  draggable: false;
`

export const RankInfos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`

export const RankQueue = styled.h4`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.support};
`

export const RankName = styled.h5`
  font-size: 1rem;
`

export const WinRate = styled.sup``

export const Main = styled.section``
