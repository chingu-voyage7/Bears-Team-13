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
/* margin-bottom:5px; */
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

const CountdownWrap = styled.div`
color:#13491c;
font-weight:normal;
font-size:30px;
margin-top:10px;
`

const EditPopUp = styled.div`
    height:400px;
    width:370px;
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
/* border:1px red solid; */
height:350px;
display:flex;
flex-direction:column;
align-items:center;
justify-items:space-around;
/* justify-content:center; */
`

const PublicWrap = styled.div`
display:flex;
align-items:center;
/* border:1px red solid; */
/* height:20px; */
width:90px;
justify-content:space-between;
margin-top:20px;
`

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
height:20px;
width:20px;
/* margin:auto auto; */
`

const PublicLabel = styled.label`
color:#d10a0a;
`

export {OneEventWrap, EventTitle, Time, TimeSpan, RecipientName, Title, ButtonWrap, ExchangDate, TitleEditWrap, CountdownWrap, EditPopUp, Form, PublicWrap, Checkbox, PublicLabel}