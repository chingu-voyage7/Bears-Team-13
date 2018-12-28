import styled from 'styled-components';

const Nav = styled.nav `
border-bottom:2px #45c132 dashed;
width:90%;
margin:0 auto;
display:flex;
justify-content:space-between;
align-content:center;
align-items:center;
width:100%;
background-color:white;
padding:5px;
`

const AppName = styled.h2 `
padding-left:30px;
color:#13491C;
letter-spacing:1px;
text-transform:uppercase;
font-size:18px;
`

const LinksContainer = styled.div `
display:flex;
width:140px;
justify-content:space-between;
/* border:1px blue solid; */
padding-right:30px;
`


const LinksContainerLoggedIn = styled.div `
display:flex;
width:380px;
justify-content:space-between; 
/* border:1px blue solid; */
padding-right:30px;
@media only screen and (max-width:600px){
flex-direction:column;
border:1px red solid;
align-items:flex-end;
margin-right:20px;
display:none;
}
`

const LinkStyle = styled.div `
/* color:rgb(234, 93, 93); */
font-weight:500;
color:#13491C;

`



export {
    Nav,
    AppName,
    LinksContainer,
    LinkStyle,
    LinksContainerLoggedIn,

};