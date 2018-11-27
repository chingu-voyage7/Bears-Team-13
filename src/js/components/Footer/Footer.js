import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FooterStyle, IconFooter, IconsFooterContainer} from './footer-style'



export default class Footer extends Component {

  render() {
    return (
        <FooterStyle>
            <IconsFooterContainer>
                <Link style={{ textDecoration: 'none' }} to="#"><i className="fab fa-github-square"></i></Link>
                <Link style={{ textDecoration: 'none' }} to="#"><i className="fab fa-github-square"></i></Link>
                <Link style={{ textDecoration: 'none' }} to="#"><i className="fab fa-github-square"></i></Link>
            </IconsFooterContainer>
          </FooterStyle>
    );
  }
}