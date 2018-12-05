import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FooterStyle, IconFooter, IconsFooterContainer} from './footer-style'

const iconStyle = {
  fontSize: '22px',
  color: '#45c132',
  textDecoration: 'none'
};

export default class Footer extends Component {
  

  render() {
    return (
        <FooterStyle>
            <IconsFooterContainer>
                <Link style={{ textDecoration: 'none' }} to="#"><i style={iconStyle} className="fab fa-github-square"></i></Link>
                <Link style={{ textDecoration: 'none' }} to="#"><i style={iconStyle} className="fab fa-github-square"></i></Link>
                <Link style={{ textDecoration: 'none' }} to="#"><i style={iconStyle}  className="fab fa-github-square"></i></Link>
            </IconsFooterContainer>
          </FooterStyle>
    );
  }
}