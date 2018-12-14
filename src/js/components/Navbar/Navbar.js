import React, {Component} from 'react';
import {NavLink, Link, Redirect} from 'react-router-dom';
import {Nav, AppName, LinksContainer, LinkStyle, LinksContainerLoggedIn} from './nav-style'
import "./active.css"
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
      this.props.setGlobal({user: {}}, () => {
        this.setState({redirect: true});
      });
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
       <NavLink to="/" style={{ textDecoration: 'none' }}>  <AppName>Secret Santa</AppName></NavLink>

        {this.props.globals.user.username?(

          <LinksContainerLoggedIn>
            <NavLink
            activeClassName="active" style={{ textDecoration: 'none' }} to="/store"><LinkStyle>shop </LinkStyle></NavLink>
            <NavLink activeClassName="active"   style={{ textDecoration: 'none' }} to="/dashboard"><LinkStyle>my events </LinkStyle></NavLink>
            <NavLink activeClassName="active"  style={{ textDecoration: 'none' }} to="/myaccount"><LinkStyle>settings</LinkStyle></NavLink>
            <NavLink activeClassName="active"  style={{ textDecoration: 'none', marginRight: '10px' }} to="#" onClick={this.logout.bind(this)}><LinkStyle>logout</LinkStyle></NavLink>
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