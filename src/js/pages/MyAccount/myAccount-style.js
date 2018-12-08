import styled from 'styled-components';
 
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
width:210px;
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
  }
`

const PasswordButton = styled.button`
color:#D10A0A;
border:none;
/* background-color:#F9F9F9; */
border-bottom:1px #D10A0A solid;
box-shadow:none;
padding:5px;
width:150px;
margin:0 auto;

transition:.2s all linear;
&:hover {
    /* background: #D10A0A; */
    /* color:white; */
    cursor:pointer;
    /* padding-bottom:8px; */
    /* border-radius:5px; */
    border:0;
  }

  &:focus{
      outline:0;
  }
  &:active{
    /* border:#D10A0A; */
    color:#D10A0A;
    /* background-color:#F9F9F9; */
    box-shadow:0px 0px 0px;
    top:2px;
  }
`

const AboutWrap = styled.div`
display:flex;
flex-direction:column;
/* border:1px gray solid; */
background-color:white;
box-shadow:5px 5px 5px rgba(0,0,0,0.5);
border-radius:10px;
padding:30px;
margin-top:20px;
justify-content:space-between;
height:300px;
`

export {Name, MyAccountWrap, NameButtonsWrap, ButtonsWrap, Button, Greeting, PasswordButton, AboutWrap}