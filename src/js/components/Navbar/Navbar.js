import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Nav, AppName, LinksContainer, LinkStyle, LinksContainerLoggedIn} from './nav-style'
import axios from 'axios';



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

          <LinksContainerLoggedIn>
            <Link style={{ textDecoration: 'none' }} to="/myaccount"><LinkStyle>my account</LinkStyle></Link>
            <Link style={{ textDecoration: 'none', marginRight: '10px' }} to="#" onClick={this.logout.bind(this)}><LinkStyle>logout</LinkStyle></Link>

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