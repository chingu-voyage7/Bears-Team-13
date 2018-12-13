import styled from 'styled-components';

const StoreWrap = styled.div`
width:380px;
margin:0 auto;
`

const SearchForm = styled.form`
 width:100%;
 border:3px #d10a0a solid;
 border-radius:5px;
 /* height:100px; */
 padding:20px;
 display:flex;
 justify-content: space-around;
 margin-top:20px;
`

const Title = styled.div`
font-size:28px;
font-weight:bold;
/* text-align:center; */
color:#D10A0A;
`

const ItemWrap = styled.div`
padding:10px;
/* border-top:1px #D10A0A solid; */
border-bottom:1px #D10A0A solid;
display:flex;
justify-content:space-between;

`

const ItemName = styled.p`
color:#D10A0A;
`


export {StoreWrap, SearchForm, Title, ItemWrap}