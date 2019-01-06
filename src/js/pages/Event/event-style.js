import styled from 'styled-components';

const OneEventWrap = styled.div`
width:370px;
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

const TitleEditWrap = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
`



const EventTitle = styled.h1`
color:#D10A0A;
text-transform:capitalize;
font-size:26px;
`

const Time = styled.p`
font-size:15px;
color:#13491c;
margin-top:-5px;
margin-bottom:40px;
padding-bottom:40px;
border-bottom:1px dashed #45c132;
`

const TimeSpan = styled.span`
font-weight:bold;
`

const RecipientName = styled.h3`
color:#D10A0A;
text-align:center;
padding-bottom:60px;
border-bottom:1px dashed #45c132;
letter-spacing:1px;
`
const Title = styled.p`
color:#D10A0A;
font-size:16px;
font-weight:bold;
text-align:center;
`
const ButtonWrap = styled.div`
width:100%;
display:flex;
margin-top:20px;
padding-bottom:40px;
justify-content:space-between;
`

const ExchangDate = styled.div`
margin-top:5px;
font-size:15px;
`
export {OneEventWrap, EventTitle, Time, TimeSpan, RecipientName, Title, ButtonWrap, ExchangDate, TitleEditWrap}