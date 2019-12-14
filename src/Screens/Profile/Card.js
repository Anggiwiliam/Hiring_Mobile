import React, { Component } from 'react';
import { Image, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View, Item ,Title,Footer, FooterTab} from 'native-base';
import axios from 'axios'

export default class Cards extends Component {
    constructor () {
        super()
        this.state = {
          isLoading: true,
          items: [],
        }
      }
    
      componentDidMount() {
        axios.get(`http://35.170.248.238:7000/engineer/read`)
          .then(res => {
            console.log(res);
            this.setState({ items: res.data });
          });
      }
       
  render() {
    const { items } = this.state
    return (
      <Container>
           <Header>
        <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <ScrollView>
        <Content>
        {items.map(product => (
          <Card style={{padding: 5, elevation: 0, borderRadius: 10}} key={product.id}>
         
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'Image URL'}} />
                <Body>
                  <Text>{product.name}</Text>
                  <Text note>{product.skill}</Text>
                  <Image source={{uri:`http://35.170.248.238:7000/myhire/file/` + product.photo }} style={{height: 150, width: 150, flex: 100}}/>
            
                </Body>
              </Left>
            </CardItem>
          
            
          </Card>
          ))}
        </Content>
        </ScrollView>
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => this.props.navigation.navigate('Card')}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical active>
              <Icon active name="navigate" />
              <Text>Navigate</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('ProfileC')}>
              <Icon name="person" />
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

