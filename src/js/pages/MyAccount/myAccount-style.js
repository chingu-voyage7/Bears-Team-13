import styled from 'styled-components';
import myImage from '../../../assets/images/gift-profile.jpeg';

 
const Greeting = styled.h1` 
color:#D10A0A;
`

const Name = styled.span`
text-transform:capitalize;
`

const MyAccountWrap = styled.div`
width:380px;
margin:0 auto;
`
const NameButtonsWrap = styled.div`
display:flex;
flex-directioN:column;
/* border:1px red solid; */
justify-content:space-between;
margin-bottom:40px;
`
const ButtonsWrap = styled.div`
width:250px;
/* border:1px green solid; */
display:flex;
margin-top:-10px;
justify-content:space-between;
align-items:center;
`

const Button = styled.button`
height:30px;
border-radius:5px;
border:1px #D10A0A solid;
color:#D10A0A;
/* box-shadow:1px 1px 1px rgba(0,0,0,0.5); */
transition:.2s all linear;

 &:hover {
    background: #D10A0A;
    color:white;
    cursor:pointer;
  }

  &:focus{
      outline:0;
  }
  &:active{
    box-shadow:0px 0px 0px;
    top:2px;
    background-color:#13491c;
    border-color:#13491c;
  }
`

const PasswordButton = styled.button`
color:#D10A0A;
border:none;
background-color:#F9F9F9;
border-bottom:1px #D10A0A solid;
box-shadow:none;
padding:5px;
width:150px;
margin:0 auto;

transition:.2s all linear;
&:hover {
    cursor:pointer;
     border-bottom:1px #F9F9F9 solid;

  }

  &:focus{
      outline:0;
  }
  &:active{
    /* border:#D10A0A; */
    color:#13491c;
    /* background-color:#F9F9F9; */
    box-shadow:0px 0px 0px;
    top:2px;
  }
`

const AboutWrap = styled.div`
display:flex;
border:1px dashed #45c132;
border-bottom:1px rgba(0,0,0,0) solid;
flex-direction:column;
/* border:1px gray solid; */
background-color:white;
/* box-shadow:5px 5px 5px rgba(0,0,0,0.5); */
border-radius:10px;
margin-top:20px;
height:340px;
padding:0%;

`

const H2 = styled.h2`
 color:#D10A0A;
 padding-bottom:10px;
 width:100px;
 border-bottom:1px #13491c solid;
 /* text-align:center; */
 text-transform:uppercase;
 font-size:18px;
 margin-left:0;
 margin-top:20px;
 margin-left:30px;
 margin-bottom:30px;
`

const P = styled.p`
color:#D10A0A;
margin:0px;
padding-left:30px;
margin-top:10px;
margin-bottom:10px;
/* margin-left:40px; */

`

const Span = styled.span`
font-weight:bold;
color:#13491c;
letter-spacing:.5px;
`

const Image = styled.div`
background-image:url(${myImage});
background-position:bottom;
background-size:cover;
/* border:1px red solid; */
height:250px;
width:378px;
margin:0 auto;
margin-top:10px;
`

const InfoWrap = styled.div`
/* border:1px dashed #45c132;
padding:0;
padding:10px;
width:340px;
margin:0 auto; */
`

export {Name, MyAccountWrap, NameButtonsWrap, ButtonsWrap, Button, Greeting, PasswordButton, AboutWrap, H2, P, Span, Image, InfoWrap}