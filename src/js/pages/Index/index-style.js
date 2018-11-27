import styled from 'styled-components';

const IndexContainer = styled.div`
display:flex;
flex-direction:column;
/* border:1px red solid; */
width:380px;
margin:20px auto;
`

const TextIndex = styled.div`
font-size:28px;
font-weight:bold;
text-align:center;
`

const AboutContainer = styled.div`
display:flex;
border:1px gray solid;
border-radius:10px;
padding:20px;
margin-top:20px;
justify-content:space-between;
`

const SantaImage = styled.div`
height:300px;
width:150px;
border:1px gray solid;
border-radius:10px;
`

const AboutTextContainer = styled.div`
display:flex;
flex-direction:column;
width:150px;

`

const AboutText = styled.p`
font-size:13px;
line-height:1.5;
`

const ButtonContainer = styled.div`
display:flex;
`



export {IndexContainer, TextIndex, AboutContainer,SantaImage, AboutTextContainer, ButtonContainer, AboutText};
