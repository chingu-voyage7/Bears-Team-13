import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
<<<<<<< HEAD
import {Nav, AppName, LinksContainer, LinkStyle, LinksContainerLoggedIn} from './nav-style'

=======
import {Nav, AppName, LinksContainer, LinkStyle} from './nav-style'
import axios from 'axios';
>>>>>>> origin/master

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    }
  }

  logout() {
    axios.get('/api/logout')
    .then((res) => {
      this.props.setGlobal({user: {}});
    })
    .catch((err) => {
      alert("Failed to logout. Please try again.");
    });
  }

  render() {
    if (this.state.redirect) {
      this.setState({redirect: false});
      return (<Redirect to="/"/>)
    }

    return (
      <Nav>
       <Link to="/" style={{ textDecoration: 'none' }}>  <AppName>Secret Santa</AppName></Link>

        {this.props.globals.user.username?(

<<<<<<< HEAD
         <LinksContainerLoggedIn>
            <Link style={{ textDecoration: 'none', marginRight: '10px' }} to="#" onClick={this.toggleLogout.bind(this)}><LinkStyle>logout</LinkStyle></Link>
            <Link style={{ textDecoration: 'none' }} to="/myaccount"><LinkStyle>Your Account</LinkStyle></Link>
          </LinksContainerLoggedIn>
=======
          <div>
            <Link style={{ textDecoration: 'none', marginRight: '10px' }} to="#" onClick={this.logout.bind(this)}>logout</Link>
            <Link style={{ textDecoration: 'none' }} to="/myaccount">Your Account</Link>
          </div>
>>>>>>> origin/master
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