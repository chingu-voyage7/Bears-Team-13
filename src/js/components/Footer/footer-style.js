import styled from 'styled-components';


const FooterStyle = styled.footer`
width:100%;
display: flex;
justify-content:flex-end;
height:50px;
/* border-top:1px red solid; */
align-items:center;
background-color:white;
`

const IconsFooterContainer = styled.div`
display:flex;
width:80px;
margin-right:30px;
/* border:1px red solid; */
justify-content:space-between;
`

const IconFooter = styled.i`
color:gray;
font-size:20px;
`

export {FooterStyle, IconsFooterContainer, IconFooter };
