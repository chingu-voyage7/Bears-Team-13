import React, {Component} from 'react';
import {IndexContainer, TextIndex, AboutContainer, SantaImage, AboutTextContainer, ButtonContainer, AboutText} from './index-style'


export default class Index extends Component {
  render () {
    return (
     <IndexContainer>
       <TextIndex> SECRET SANTS MADE EASY</TextIndex>
       <AboutContainer>
         <SantaImage> Santa graphic goes here </SantaImage>
         <AboutTextContainer>
           <AboutText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque bibendum odio ligula, vel ultricies sapien maximus non. Praesent ullamcorper lorem at consequat accumsan. Integer feugiat scelerisque commodo.</AboutText>
           <h5> start your exchange </h5>
             <ButtonContainer>
                  <button> sign up </button>
                  <button> sign in </button>
              </ButtonContainer>
         </AboutTextContainer>

       </AboutContainer>

     </IndexContainer>
    );
  }
}

