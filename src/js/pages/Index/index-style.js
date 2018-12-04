import styled from 'styled-components';
import myImage from '../../../assets/images/gift.jpg';

const IndexContainer = styled.div`
display:flex;
flex-direction:column;
/* border:1px red solid; */
width:380px;
margin:20px auto;
`

const TitleIndex = styled.div`
font-size:28px;
font-weight:bold;
text-align:center;
color:#D10A0A;
margin-top:-15px;
`

const TitleGift = styled.div`
margin-top:50px;
font-size:28px;
font-weight:bold;
text-align:center;
color:#D10A0A;
`

const AboutContainer = styled.div`
display:flex;
flex-direction:column;
/* border:1px gray solid; */
background-color:white;
box-shadow:5px 5px 5px rgba(0,0,0,0.5);
border-radius:10px;
padding:30px;
margin-top:20px;
justify-content:space-between;
`

const SantaImage = styled.div`
height:300px;
width:100%;
/* border:1px gray solid; */
border-radius:10px;
background-image:url(${myImage});
background-size:cover;
background-position:right;
`

const AboutTextContainer = styled.div`
display:flex;
flex-direction:column;
width:100%;
justify-content:center;
align-items:center;
`

const AboutText = styled.p`
font-size:13px;
line-height:1.5;
`

const ButtonContainer = styled.div`
display:flex;
width:50%;
justify-content:space-between;
padding-bottom:10px;
`
const StartExchange = styled.h4`
color:#D10A0A;
`
const Button = styled.button`
border:1px #D10A0A solid;
background-color:#D10A0A;
color:white;
box-shadow:2px 2px 2px rgba(0,0,0,0.5);
border-radius:5px;
padding:10px;
`


export {IndexContainer, TitleIndex, AboutContainer,SantaImage, AboutTextContainer, ButtonContainer, AboutText,StartExchange, Button, TitleGift};
