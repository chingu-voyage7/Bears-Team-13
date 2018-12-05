import styled from 'styled-components';

const SignupContainer = styled.div`
width:380px;
margin:0 auto;
margin-top:40px;
`

const TextSignup = styled.div`
width:70%;
/* border:1px red solid; */
font-size:30px;
font-weight:bold;
margin-bottom:40px;
`

const FormContainer = styled.form`
display:flex;
flex-direction:column;
/* border:1px red solid; */
align-content:center;
align-items:center;
/* height:800px; */
justify-content:space-around;
padding:30px;
`

const LabelSignUp = styled.label`
margin-top:35px;
margin-bottom:5px;
`

const InputStyle = styled.input`
height:30px;
width:200px;
border-radius:10px;
/* border-style:solid; */
border:1px gray solid;
`

const GraphicContainer = styled.div`
border-radius:10px;
height:160px;
border:1px gray solid;
text-align:center;
`

const InputSubmit = styled.input`
/* margin-top:140px; */
border-radius:10px;
margin-top:40px;
padding:10px;
`


export {InputStyle, FormContainer, SignupContainer, TextSignup, GraphicContainer, LabelSignUp, InputSubmit };
