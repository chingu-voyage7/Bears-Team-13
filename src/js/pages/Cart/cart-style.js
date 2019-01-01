import styled from 'styled-components';

const CartWrap = styled.div`
width:380px;
margin: 0 auto;
`

const ItemsWrap = styled.div`
border:1px #13491c dashed;
border-radius:10px;
padding:30px;
display:flex;
flex-direction:column;
`

const Item = styled.div`
margin-bottom:40px 0;
border-top:1px #13491c solid;
border-bottom:1px #13491c solid;
padding-bottom:20px;
`

const ImageWrap = styled.div`
width:100px;
height:100px;
border:1px #13491c solid;
border-radius:10px;
margin-top:-10px;
`

const ImagePriceWrap = styled.div`
display:flex;
justify-content:space-between;
/* border:1px red solid; */
`

const PriceSelectWrap = styled.div`
display:flex;
flex-direction:column;
align-items:flex-end;
justify-content:space-between;
/* border:1px blue solid; */
`

const ItemName = styled.div`
color:#D10A0A;
font-weight:bold;
padding-bottom:10px;
margin:20px 0;
`
const Price = styled.div`
color:#13491c;
font-weight:bold;
`

const Delete = styled.button`
height:30px;
border-radius:5px;
border:1px #D10A0A solid;
color:#D10A0A;
font-size:15px;
/* box-shadow:1px 1px 1px rgba(0,0,0,0.5); */
transition:.2s all linear;

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
    background-color:#13491c;
    border-color:#13491c;
  }
`

const Checkout = styled.button`
/* margin-top:40px; */
border:1px #13491c solid;
background-color:#13491c;
color:white;
box-shadow:2px 2px 2px rgba(0,0,0,0.5);
border-radius:5px;
padding:10px;
font-size:16px;
transition:.2s all linear;
float:right;
&:hover{
  cursor:pointer;
  color:#13491c;
  background-color:white;
  &:focus{
    outline:0;
  }
}
`

const ButtonsWrap = styled.div`
margin-top:40px;
`

export {CartWrap, ItemsWrap, Item, ImageWrap, ImagePriceWrap, PriceSelectWrap, ItemName, Price, Delete, Checkout, ButtonsWrap}