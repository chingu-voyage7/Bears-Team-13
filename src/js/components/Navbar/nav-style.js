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
@media only screen and (max-width:600px){
    border-bottom:none;
    height:100px;
}
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
padding-right:30px;
@media only screen and (max-width:600px){
width:80px;
flex-direction:column;
background-color:rgba(255,255,255,.8);
border-radius:10px;
border:1px #13491C solid;
padding:20px;
align-items:flex-start;

width:180px;
display:${props => props.mobileClicked ? "flex" : "none"};
}
`

const LinkStyle = styled.div `
/* color:rgb(234, 93, 93); */
font-weight:500;
color:#13491C;
@media only screen and (max-width:600px){
    margin-top:5px;
    margin-bottom:5px;
}
`

const MainNavWrap = styled.div`
display:flex;
/* border:1px green solid; */
flex-direction:column;
align-items:flex-end;
margin-right:10px;
position:absolute;
right:0;
top:0px;
`



export {
    Nav,
    AppName,
    LinksContainer,
    LinkStyle,
    LinksContainerLoggedIn,
    MainNavWrap
};