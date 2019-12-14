import React, { Component } from 'react';
import { Image, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View, Item ,Title,Footer, FooterTab,Input} from 'native-base';

import { connect } from "react-redux";
import { login } from '../../../redux/actions/authActions'
import { increaseCounter, descreaseCounter } from '../../../redux/actions/counterActions'
import { getEngineer } from '../../../redux/actions/engineerActions'
import { jwt } from '../../../redux/actions/tokenAction'
import axios from 'axios'

class Home extends Component {
    constructor () {
        super()
        this.state = {
          isLoading: true,
          items: [],
          search: ''
        }
      }
    
      componentDidMount() {
        axios.get(`http://192.168.1.5:4000/engineer/read`)
          .then(res => {
            console.log(res);
            this.setState({ items: res.data });
          });
      }

      _sendLogout = async () => {
        isLogin = 0; 
        console.log(this.props.token);
        
        try{
            Axios.defaults.headers.common['Authorization'] = this.props.token;
            await Axios.get('http://192.168.1.5:4000/myhire/logout')
            Axios.defaults.headers.common['Authorization'] = '0';
            await this.props.reduxLogin(false)
            await this.props.navigation.navigate('Home')
        }catch(error){
          await this.props.navigation.navigate('Home')
            console.log(error);
        }
    }

    _setIdEngineer = async (id) => {
      await this.props.reduxEngineer(id);
      await console.log(this.props.id);
      this.props.navigation.navigate('Detail')
    }

    searchSkill = async()=> {
      try {
          const search = this.state.search
          console.log(search);
          
          const result = await axios.get(`http://192.168.1.5:4000/myhire/search/?skill=${search}`)
          console.log(result.data.result);
          this.setState({data: result.data.result, isLoading: false})
      } catch (error) {
          console.log(error);
      }
    }

       
  render() {
    const { items } = this.state
    console.log(this.props.category);
    return (
      <Container>
           <Header searchBar rounded
                autoCorrect={false}>
           {
             (this.props.loggedIn)&&
             <Item>
                <Icon name="ios-search" />
                <Input placeholder="Search" 
                  onChangeText={value => this.setState({search: value})}
                />
            </Item>
           }
           {
             
             (this.props.loggedIn)&&
             <Left>
               <Button
                onPress = {()=>this.searchSkill()}
               >
                  <Text>Search</Text>
                </Button>
             </Left>
             
           }
            
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
                  <Image source={{uri:`http://192.168.1.5:4000/myhire/file/` + product.photo }} style={{height: 150, width: 150, flex: 100}}/>
            
                </Body>
                <Button onPress={() => {this._setIdEngineer(product.created_by)}}>
                    <Icon name="eye" /> 
                    
                    </Button>
              </Left>
            </CardItem>
          
            
          </Card>
          ))}
        </Content>
        </ScrollView>
        <Footer>
          <FooterTab>
            <Button vertical active onPress={() => this.props.navigation.navigate('Index')}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={() =>
                  this.props.navigation.navigate('ListP')
                }>
              <Icon name="list" />
              <Text>Project</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('ProfileC')}>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
            <Button vertical  onPress={() => {this._sendLogout()}}>
              <Icon name="exit" />
              <Text>Logout</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      counter: state.counterReducer.counter,
      loggedIn: state.authReducer.loggedIn,
      token: state.tokenReducer.token,
      engineerList: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
      reduxIncreaseCounter: () => dispatch(increaseCounter()),
      reduxDecreaseCounter: () => dispatch(descreaseCounter()),
      reduxLogin: (trueFalse) => dispatch(login(trueFalse)),
      reduxToken: (token) => dispatch(jwt(token)),
      reduxEngineer: (id) => dispatch(getEngineer(id)),
      reduxCategory: (category) => dispatch(role(category)),
  };
};



export default connect(mapStateToProps, mapDispatchToProps)   (Home)