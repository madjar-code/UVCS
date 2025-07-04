import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo onClick={handleLogoClick}>UVCS</Logo>
        <NavLink href="#">About</NavLink>
      </HeaderContent>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  height: 50px;
  background-color: var(--color-gray-3);
  display: flex;
  justify-content: center;
`

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1160px;
  /* background-color: yellow; */
`

const Logo = styled.h1`
  font-size: 22px;
  font-weight: var(--font-weight-medium);
  color: var(--color-blue);
  margin: 0;
  cursor: pointer;
`

const NavLink = styled.a`
  color: var(--color-white);
  text-decoration: none;
  font-size: 18px;
  font-weight: var(--font-weight-regular);
`

export default Header
