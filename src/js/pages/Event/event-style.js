import styled from 'styled-components';

const OneEventWrap = styled.div`
width:380px;
margin:0 auto;
background-color:rgba(255,255,255,.9);
border:1px dashed #45c132;
box-shadow:5px 5px 5px rgba(0,0,0,0.4);
display:flex;
flex-direction:column;
/* align-items:center; */
border-radius:5px;
padding:10px 30px;
`

const EventTitle = styled.h1`
color:#D10A0A;
text-transform:capitalize;
`

const Time = styled.p`
font-size:16px;
color:#13491c;
margin-top:-15px;
font-weight:bold;
margin-bottom:40px;
padding-bottom:20px;
border-bottom:1px dashed #45c132;
`
export {OneEventWrap, EventTitle, Time}