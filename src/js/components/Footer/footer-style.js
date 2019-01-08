import styled from 'styled-components';


const FooterStyle = styled.footer`
width:100%;
display: flex;
justify-content:flex-end;
height:100px;
/* border-top:1px red solid; */
align-items:center;
background-color:white;
position: absolute;
 bottom: 0;
 width: 100%;
 img {
   position: relative;
   height: 55px;
   margin-right: 10px;
   border-radius: 50%;
 }
`

const Overlay = styled.div`
 position: absolute;
 top: 0;
 left: 0;
  height: 55px;
  width: 55px;
  border-radius: 50%;
  background-color: transparent;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`

const IconsFooterContainer = styled.div`
margin-right:30px;
/* border:1px red solid; */
justify-content:space-between;
a {
  display: inline-block;
  position: relative;
}
`

const IconFooter = styled.i`
color:gray;
font-size:20px;
`


const P = styled.p `
margin-right:10px;
font-size:14px;
color:#13491C;
`
export {FooterStyle, IconsFooterContainer, IconFooter, P, Overlay };
