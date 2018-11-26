import styled from 'styled-components';

const Nav = styled.nav`
/* border:1px red solid; */
width:90%;
margin:0 auto;
display:flex;
justify-content:space-between;
align-content:center;
align-items:center;
width:100%;
border-bottom:1px rgb(234, 93, 93) solid;
padding-bottom:10px;
padding-top:10px;
`

const AppName = styled.h2`
padding-left:30px;
/* color:rgb(234, 93, 93); */
letter-spacing:2px;
text-transform:uppercase;
font-size:32px;
`

const LinksContainer = styled.div`
display:flex;
width:120px;
justify-content:space-between;
/* border:1px blue solid; */
padding-right:30px;
`

const LinkStyle = styled.div`
/* color:rgb(234, 93, 93); */
font-weight:500;
`



export {Nav, AppName, LinksContainer, LinkStyle };
