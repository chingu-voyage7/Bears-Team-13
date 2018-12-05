import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Nav, AppName, LinksContainer, LinkStyle} from './nav-style'


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
        <AppName>Secret Santa</AppName>
        
        {this.props.globals.user?(
          
          <div>
            <Link style={{ textDecoration: 'none' }} to="#" onClick={this.toggleLogout.bind(this)}>logout</Link>
          </div>
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