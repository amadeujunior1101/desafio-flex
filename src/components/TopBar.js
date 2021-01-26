import React from 'react';
import styled from 'styled-components';
// import Logo from '../img/Grupo 290.png';

const TopBar = () => {
    return (
        <Wrapper>
            <NavBar>
             <Menu>
                <MenuBar />
                <MenuBar />
                <MenuBar />
             </Menu>
             <LogoContainer>
                  {/* <img src={Logo} width={120} height={30} alt=""/>            */}
            </LogoContainer>
            </NavBar>
        </Wrapper>
    );
};
const LogoContainer = styled.div`
 width: 100%; 
 justify-content: center; 
 display: flex; 
 align-items: center;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  background: var(--color-background-navbar);
  justify-content: center;
  align-items: center;
  display: flex;  
`;

const NavBar = styled.div`
  width: 100%;
  /* max-width: 1140px; */
  height: 60px;
  align-items: center;
  display: flex;
  margin-left: 20px;
`;

const Menu = styled.div`
  width: 45px; 
  height: 36px; 
  justify-content: space-between; 
  display: grid; 
  align-items: center;
`;

const MenuBar = styled.div`
  width: 45px;
  height: 5px;
  background: #FFFFFF;
`;

export default TopBar;