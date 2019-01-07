import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FooterStyle, IconsFooterContainer, P} from './footer-style'

const iconStyle = {
  fontSize: '22px',
  color: '#45c132',
  textDecoration: 'none'
};

export default class Footer extends Component {
  

  render() {
    return (
        <FooterStyle>
          <P> made by </P>
            <IconsFooterContainer>
                
                <a style={{ textDecoration: 'none' }} target="_blank" href="https://alex-cannon.github.io/">Alex Cannon<i style={iconStyle} className="fas fa-user-alt"></i></a>
                <a style={{ textDecoration: 'none' }} target="_blank" href="https://designbyinna.com">Inna<i style={iconStyle} className="fas fa-user-alt"></i></a>
                <a style={{ textDecoration: 'none' }} target="_blank" href="https://github.com/gabrielgs">Gabriel<i style={iconStyle}  className="fas fa-user-alt"></i></a>
            </IconsFooterContainer>
          </FooterStyle>
    );
  }
}