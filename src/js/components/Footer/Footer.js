import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FooterStyle, IconsFooterContainer, P, Overlay} from './footer-style'

const iconStyle = {
  fontSize: '22px',
  color: '#45c132',
  textDecoration: 'none'
};

export default class Footer extends Component {
  

  render() {
    return (
        <FooterStyle>
          <P> This website was created by Alex, Inna, and Gabriel. :) </P>
            <IconsFooterContainer>
                
                <a style={{ textDecoration: 'none' }} target="_blank" href="https://alex-cannon.github.io/">
                 <img src={"https://avatars0.githubusercontent.com/u/28692645?s=460&v=4"} alt="Alex Cannon" />
                 <Overlay title="Alex Cannon"/> 
                </a>
                <a style={{ textDecoration: 'none' }} target="_blank" href="https://designbyinna.com">
                  <img src={"https://avatars1.githubusercontent.com/u/29341937?s=460&v=4"} alt="Inna Leikina" />
                  <Overlay title="Inna Leikina"/> 
                </a>
                <a style={{ textDecoration: 'none' }} target="_blank" href="https://github.com/gabrielgs">
                  <img src={"https://avatars1.githubusercontent.com/u/3937012?s=460&v=4"} alt="Gabriel Garcia" />
                  <Overlay title="Gabriel Garcia"/> 
                </a>
            </IconsFooterContainer>
          </FooterStyle>
    );
  }
}