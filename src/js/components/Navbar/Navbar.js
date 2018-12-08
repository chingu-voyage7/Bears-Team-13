import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Nav, AppName, LinksContainer, LinkStyle, LinksContainerLoggedIn} from './nav-style'


export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    }
  }

  toggleLogout() {
    const other = !this.state.logout;
    this.setState({logout: other});
  }

  render() {
    if (this.state.redirect) {
      this.setState({redirect: false});
      return (<Redirect to="/"/>)
    }

    return (
      <Nav>
       <Link to="/" style={{ textDecoration: 'none' }}>  <AppName>Secret Santa</AppName></Link>

        {this.props.globals.user?(

         <LinksContainerLoggedIn>
            <Link style={{ textDecoration: 'none', marginRight: '10px' }} to="#" onClick={this.toggleLogout.bind(this)}><LinkStyle>logout</LinkStyle></Link>
            <Link style={{ textDecoration: 'none' }} to="/myaccount"><LinkStyle>Your Account</LinkStyle></Link>
          </LinksContainerLoggedIn>
        ):(
          <LinksContainer>

            <Link to="/signup" style={{ textDecoration: 'none' }}>  <LinkStyle>signup</LinkStyle></Link>
            <Link to="/login" style={{ textDecoration: 'none' }}>  <LinkStyle> login </LinkStyle></Link>

          </LinksContainer>
        )}
      </Nav>
    );
  }
}