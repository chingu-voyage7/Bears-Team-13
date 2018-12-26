import styled from 'styled-components';

const Submit= styled.input `
width:200px;
border-radius:5px;
margin:0 auto;
margin-top:60px;
padding:10px;
border:1px #D10A0A solid;
color:white;
background-color:#D10A0A;
font-weight:bold;
box-shadow:2px 2px 2px rgba(0,0,0,0.5);
transition:.2s all linear;

 &:hover {
    background: white;
    color:#D10A0A;
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


const InvitePopUpWrap = styled.div`
    height:350px;
    width:380px;
    border:4px #d10a0a solid;
    display:flex;
    flex-direction:column;
    position:fixed;
    top : 100px;
    margin:0 auto;
    padding:20px;
    background-color:rgba(255,255,255,.95);
    text-align:center;
    margin-left:-30px;
`


const Form = styled.form`
/* width:100%; */
/* border:1px red solid; */
display:flex;
flex-direction:column;
align-items:center;
/* margin:0 auto; */
`

const Title = styled.h2`
color:#d10a0a;
`
const Label = styled.label`
color:#d10a0a;
margin-top:20px;
margin-bottom:10px;
`

export{Submit, InvitePopUpWrap, Form, Title, Label}