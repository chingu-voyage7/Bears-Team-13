import styled from 'styled-components';
import myImage from '../../../assets/images/red_ball.jpg';



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
color:#D10A0A;
line-height:1.2;
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
color:#D10A0A;
`

const InputStyle = styled.input`
height:30px;
width:200px;
border-radius:10px;
/* border-style:solid; */
border:1px #45c132  solid;
`

const GraphicContainer = styled.div`
border-radius:10px;
height:200px;
text-align:center;
background-image:url(${myImage});
background-position:center;
background-size:cover;
`

const InputSubmit = styled.input`
/* margin-top:140px; */
border-radius:10px;
margin-top:40px;
padding:10px;
background-color:#D10A0A;
border-color:#D10A0A;
color:white;
box-shadow:2px 2px 2px rgba(0,0,0,0.5);

`


export {InputStyle, FormContainer, SignupContainer, TextSignup, GraphicContainer, LabelSignUp, InputSubmit };
