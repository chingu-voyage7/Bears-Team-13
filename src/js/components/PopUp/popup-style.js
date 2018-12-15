import styled from 'styled-components';


const Form = styled.form`
   height:450px;
    width:380px;
    border:4px #d10a0a solid;
    display:flex;
    flex-direction:column;
    /* justify-content: space-around; */
    /* align-items:center; */
    /* display:none; */
    position:fixed;
    top : 100px;
    margin:0 auto;
    padding:20px;
    background-color:rgba(255,255,255,.95);
`

const Input = styled.input`
height:30px;
width:200px;
border-radius:10px;
/* border-style:solid; */
border:1px #45c132  solid;
&:focus{
outline:0;
border:3px #45c132  solid;
}
`

const InputsContainer = styled.div`
margin-top:10px;
display:flex;
flex-direction:column;
justify-content:space-around;
align-items:center;
/* border:1px red solid; */
height:300px;
`

const CloseButton = styled.button`
width:40px;
/* margin-left:90%; */
font-weight:bold;
margin-top:10px;
margin-left:85%;
margin-right:10px;
padding:10px;
border:2px #d10a0a solid;
color:#d10a0a;
transition:.2s linear all;
box-shadow:1px 1px 1px rgba(0,0,0,0.5);
&:focus{
    outline:0;
}
&:hover{
    cursor: pointer;
    color:white;
    background-color:#d10a0a;
}
&:active{
    box-shadow:none;
}
`

const Submit= styled.button `
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

export {Form, Input, InputsContainer, CloseButton, Submit}