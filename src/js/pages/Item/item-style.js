import styled from 'styled-components';

const ItemWrap = styled.div`
width:380px;
/* height:400px; */
margin:0 auto;
border:1px #45c132 dashed;
padding:20px;
border-radius:10px;
text-align:center;
display:flex;
flex-direction:column;
align-items:center;
/* justify-content:space-around; */
`


const ImageWrap = styled.div`
width:50%;
margin:0 auto;
height:150px;
border:1px #45c132 solid;
border-radius:10px;
margin-top:30px;
background-image:url(${props => props.image});
background-size:cover;
background-repeat:no-repeat;
background-position:right;
margin-top:0px;
`

const H2 = styled.h2`
color:#D10A0A;
font-size:20px;
margin-top:20px;
`

const Form = styled.form`
display:flex;
margin-top:50px;
/* border:1px red solid; */
width:90%;
justify-content:space-around;
padding-bottom:20px;
`

const Price = styled.div`
font-weight:bold;
color:#13491c;
margin-top:10px;
`

const Submit = styled.input`
border:1px #D10A0A solid;
background-color:#D10A0A;
color:white;
box-shadow:2px 2px 2px rgba(0,0,0,0.5);
border-radius:5px;
padding:10px;
font-size:16px;
transition:.2s all linear;
&:hover{
  cursor:pointer;
  color:#D10A0A;
  background-color:white;
  &:focus{
    outline:0;
  }
}
`

const Select = styled.select`
border-color:#D10A0A;
width:150px;
&:focus{
    outline:0;
    border:2px #D10A0A solid;
}
`

const NameCartWrap = styled.div`
display:flex;
align-items:center;
/* border:1px red solid; */
width:170px;
margin:0 auto;
justify-content:space-between;
`

const CartSpan = styled.span`
font-size:16px;
margin-left:5px;
/* border:1px red solid; */
`

const CartWrap = styled.div`
margin-bottom:40px;
/* border:1px red solid; */
width:90%;
margin: 0 auto;
display:flex;
justify-content:flex-end;
`
export {ItemWrap, ImageWrap, H2, Form, Price, Submit, Select, NameCartWrap, CartSpan, CartWrap}