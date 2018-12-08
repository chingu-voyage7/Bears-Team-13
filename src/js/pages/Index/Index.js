import React, {Component} from 'react';
import {IndexContainer, TitleIndex, AboutContainer, SantaImage, AboutTextContainer, ButtonContainer, AboutText, StartExchange,Button, TitleGift, Grid, GridItem} from './index-style'


export default class Index extends Component {
  render () {
    return (
     <IndexContainer>
       <TitleIndex> SECRET SANTA MADE EASY</TitleIndex>
       <AboutContainer>
         <SantaImage> </SantaImage>
         <AboutTextContainer>
           <AboutText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque bibendum odio ligula, vel ultricies sapien maximus non. Praesent ullamcorper lorem at consequat accumsan. Integer feugiat scelerisque commodo.</AboutText>
           <StartExchange> start your exchange </StartExchange>
             <ButtonContainer>
                  <Button> sign up </Button>
                  <Button> sign in </Button>
              </ButtonContainer>
         </AboutTextContainer>

       </AboutContainer>

       <TitleGift> GIFTS UNDER $20</TitleGift>
       <Grid>
         <GridItem></GridItem>
         <GridItem></GridItem>
         <GridItem></GridItem>
         <GridItem></GridItem>
         <GridItem></GridItem>
         <GridItem></GridItem>
         <GridItem></GridItem>
         <GridItem></GridItem>
         <GridItem></GridItem>
         <GridItem></GridItem>
         <GridItem></GridItem>
         <GridItem></GridItem>

       </Grid>

     </IndexContainer>
    );
  }
}

