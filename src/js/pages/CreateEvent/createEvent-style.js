import styled from 'styled-components';

const Submit = styled.input`
width:200px;
border-radius:5px;
margin:0 auto;
margin-top:40px;
padding:10px;

border:1px #D10A0A solid;
color:#D10A0A;
font-weight:bold;
box-shadow:2px 2px 2px rgba(0,0,0,0.5);
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

const MakeEventWrap = styled.div`
margin:0 auto;
width:380px;
height:500px;
z-index:1;
`
const PublicWrap = styled.div`
display:flex;
/* border:1px red solid; */
align-items:center;
padding:0;
margin-top:30px;
`

const PublicLabel = styled.label`
color:#D10A0A;
margin-right:30px;
`

const Label = styled.label`
color:#D10A0A;
margin-bottom:-10px;
margin-top:20px;

`

const CheckBox = styled.input`
height:20px;
width:20px;
border:1px #D10A0A solid;
box-shadow:none;
&:hover{
    cursor:pointer;
}
`

const Form = styled.form`
 height:550px;
    width:380px;
    border:4px #d10a0a solid;
    display:flex;
    flex-direction:column;
    align-items:center;
    top : 100px;
    margin:0 auto;
    padding:20px;
    background-color:rgba(255,255,255,.95);
`



export {Submit, MakeEventWrap, PublicWrap, PublicLabel, CheckBox, Form, Label }