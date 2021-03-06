import styled from 'styled-components';
import myImage from '../../../assets/images/christmas.jpeg';

const LoginContainer = styled.div`
width:370px;
display:flex;
flex-direction:column;
/* border:1px red solid; */
margin:0 auto;
background-image:url(${myImage});
background-size:cover;
background-position:center;
height:300px;
border-radius:5px;
box-shadow:5px 5px 5px rgba(0,0,0,0.5);

`

const Form = styled.form`
display:flex;
flex-direction:column;
height:200px;
text-align:center;
margin-top:70px;
/* justify-content:space-between; */
/* border:1px green solid; */
`

const Input = styled.input`
width:60%;
height:30px;
width:200px;
border-radius:10px;
/* border-style:solid; */
border:1px #45c132  solid;
margin:0 auto;
&:focus{
  outline:0;
  border:2px #45c132  solid;

}
`
const Submit = styled.input`
width:100px;
border-radius:5px;
margin:0 auto;
margin-top:40px;
padding:10px;
border:1px #D10A0A solid;
color:#D10A0A;
font-weight:bold;
box-shadow:2px 2px 2px rgba(0,0,0,0.5);
transition:.2s all linear;
background-color:white;
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
const Label = styled.label`
color:#D10A0A;
margin-top:20px;
/* font-weight:bold; */
`


export {LoginContainer, Form, Input, Submit, Label}