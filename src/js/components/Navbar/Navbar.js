import React, {Component} from 'react';
import {NavLink, Link, Redirect} from 'react-router-dom';
import {Nav, AppName, LinksContainer, LinkStyle, LinksContainerLoggedIn, MainNavWrap} from './nav-style'
import "./active.css";
import "./mobileNav.css";
import axios from 'axios';
import { throws } from 'assert';
import { runInThisContext } from 'vm';



export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      mobileMenuClicked:false
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

  handleClick = () =>{
    if (!this.state.mobileMenuClicked) {
      this.setState({
        mobileMenuClicked: true
      })
    } else {
      this.setState({
        mobileMenuClicked: false
      })
    }
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

          <MainNavWrap>

          <i onClick={this.handleClick} className="fa fa-bars mobile-nav"></i>


          <LinksContainerLoggedIn mobileClicked={this.state.mobileMenuClicked}>

            <NavLink
            activeClassName="active" style={{ textDecoration: 'none' }} to="/store"><LinkStyle>shop </LinkStyle></NavLink>
            <NavLink activeClassName="active"   style={{ textDecoration: 'none' }} to="/myevents"><LinkStyle>my events </LinkStyle></NavLink>
            <NavLink activeClassName="active"  style={{ textDecoration: 'none' }} to="/myaccount"><LinkStyle>settings</LinkStyle></NavLink>
            <NavLink activeClassName="active"  style={{ textDecoration: 'none' }} to="/cart"><LinkStyle>cart</LinkStyle></NavLink>
            <NavLink activeClassName="active"  style={{ textDecoration: 'none'}} to="#" onClick={this.logout.bind(this)}><LinkStyle>logout</LinkStyle></NavLink>

         </LinksContainerLoggedIn>
         </MainNavWrap>
        ):(
          <LinksContainer>

            <NavLink activeClassName="active" to="/signup" style={{ textDecoration: 'none' }}>  <LinkStyle>signup</LinkStyle></NavLink>
            <NavLink activeClassName="active" to="/login" style={{ textDecoration: 'none' }}>  <LinkStyle> login </LinkStyle></NavLink>

          </LinksContainer>
        )}
      </Nav>
    );
  }
}