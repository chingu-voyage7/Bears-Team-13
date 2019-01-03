import React, {Component} from 'react';
import axios from 'axios';

import {IndexContainer, TitleIndex, AboutContainer, SantaImage, AboutTextContainer, ButtonContainer, AboutText, StartExchange,Button, TitleGift, Grid, GridItem, ItemName, ItemPrice, Image} from './index-style'
import {Link} from 'react-router-dom';

const Item = ({ item, handleItemClick }) => {
  return (

    <GridItem image={"/api/static/images/item." + item._id} alt={item.name} onClick={handleItemClick}>
      <ItemName>{item.name}</ItemName>
      {/* <Image src={"/api/static/images/item." + item._id} alt={item.name} /> */}

      <ItemPrice>{item.usd}</ItemPrice>

    </GridItem>

  )
}

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      query: '',
      loader: false,
      searchPerformed: false
    }
  }

  componentDidMount() {

    axios.get('/api/items')
      .then(res => {
        this.setState({
          items: res.data,
        })
      })
      .catch(err => console.log(err.response))
  }

  handleItemClick(itemId) {
    const { history } = this.props

    history.push(`/store/item/${itemId}`)
  }


  render () {
    const { items, loader } = this.state;
    let storeItems = [];

    if (items && items.length > 0) {
      storeItems = items.slice(0, 8).map(item => {
        return (
          <Item
            item={item}
            key={item._id}
            handleItemClick={() => this.handleItemClick(item._id)}>
          </Item>
        )
      })
    }



    return (
     <IndexContainer>
       <TitleIndex> SECRET SANTA MADE EASY</TitleIndex>
       <AboutContainer>
         <SantaImage> </SantaImage>
         <AboutTextContainer>
           <AboutText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque bibendum odio ligula, vel ultricies sapien maximus non. Praesent ullamcorper lorem at consequat accumsan. Integer feugiat scelerisque commodo.</AboutText>
           <StartExchange> start your exchange </StartExchange>
             <ButtonContainer>
                 <Link to="/signup" styles={{textDecoration:'none'}}><Button> sign up </Button></Link>
                 <Link to="/login" style={{ textDecoration: 'none' }}> <Button> log in </Button></Link>
              </ButtonContainer>
         </AboutTextContainer>

       </AboutContainer>

       <TitleGift> GIFTS UNDER $20</TitleGift>
       <Grid>
       {storeItems}
       </Grid>

     </IndexContainer>
    );
  }
}

