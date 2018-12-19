import styled from 'styled-components';
import myImage from '../../../assets/images/pine-cones.jpeg';


const DashboardWrap = styled.div`
width:380px;
margin:0 auto;
`

const EventsWrap = styled.div`
background-color:white;
background-image:url(${myImage});
background-size:cover;
background-position:right;
margin-top:30px;
/* box-shadow:5px 5px 5px rgba(0,0,0,0.4); */
border-radius:10px;
padding:30px;
`
const ButtonWrap = styled.div`
margin-top:-10px;
width:230px;
display:flex;
justify-content:space-between;
`

const EventName = styled.p`
color:#13491c;
font-size:20px;
padding:0;
margin:0;
text-transform:capitalize;
margin-bottom:10px;
padding-bottom:10px;
border-bottom:1px dashed #45c132; 
`

const OneEventWrap = styled.div`
background-color:rgba(255,255,255,.9);
border:1px dashed #45c132;
box-shadow:5px 5px 5px rgba(0,0,0,0.4);
margin:50px 0;
display:flex;
flex-direction:column;
/* align-items:center; */
border-radius:5px;
padding:30px;
&:hover{
    cursor:pointer;
}
`

const Span = styled.span`
font-weight:bold;
`

const P =styled.p`
text-transform:lowercase;
color:#D10A0A;
margin:5px;
`

const AuthorSpan = styled.span`
font-weight:bold;
text-transform:capitalize;
`



export {DashboardWrap, EventsWrap, ButtonWrap, EventName, OneEventWrap, Span, P, AuthorSpan}