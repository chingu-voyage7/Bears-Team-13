import styled from 'styled-components';
import myImage from '../../../assets/images/invites-2.jpeg';


const InvitesContainer =  styled.div`
width:380px;
margin:0 auto;
/* border:1px #D10A0A solid; */
padding:10px;
border-radius:10px;
background-image:url(${myImage});
background-position:top;
background-size:cover;
text-align:center;
min-height:400px;
max-height:auto;
`

const Text = styled.p`
color:#D10A0A;
margin-top:120px;
`

const EventName = styled.h3`
color:#13491c;
font-size:20px;
padding:0;
margin:0;
text-transform:capitalize;
margin-bottom:10px;
padding-bottom:10px;
border-bottom:1px dashed #45c132; 

`

const ButtonWrap = styled.div`
width:150px;
display:flex;
justify-content:space-between;
margin:0 auto;
margin-top:20px;
`

const OneInviteWrap = styled.div`
background-color:rgba(255,255,255,.9);
border:1px dashed #45c132;
/* box-shadow:5px 5px 5px rgba(0,0,0,0.4); */
margin:50px 0;
display:flex;
flex-direction:column;
/* align-items:center; */
border-radius:5px;
padding:30px;
text-align:center;
margin:0 auto;
margin-bottom:20px;
width:300px;

`

const AcceptButton = styled.button`
height:30px;
border-radius:5px;
border:1px #13491c solid;
color:#13491c;
font-size:15px;
/* box-shadow:1px 1px 1px rgba(0,0,0,0.5); */
transition:.2s all linear;

 &:hover {
    background: #13491c;
    color:white;
    cursor:pointer;
  }

  &:focus{
      outline:0;
  }
  &:active{
    box-shadow:0px 0px 0px;
    top:2px;
    background-color:#13491c;
    border-color:#13491c;
  }
`


export {InvitesContainer, Text, EventName, ButtonWrap, OneInviteWrap, AcceptButton };