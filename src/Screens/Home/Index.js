import React, { Component } from 'react';
import { Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View, Item ,Title,Footer, FooterTab,Input} from 'native-base';

import { connect } from "react-redux";
import { login } from '../../../redux/actions/authActions'
import { increaseCounter, descreaseCounter } from '../../../redux/actions/counterActions'
import { getEngineer } from '../../../redux/actions/engineerActions'
import { jwt } from '../../../redux/actions/tokenAction'
import axios from 'axios'
import { FlatGrid } from 'react-native-super-grid';

class Home extends Component {
    constructor () {
        super()
        this.state = {
          isLoading: true,
          items: [],
          search: '',
          data: [],
        }
      }
    
      componentDidMount() {
        axios.get(`http://192.168.0.108:4000/engineer/read`)
          .then(res => {
            // console.warn(res.data);
            this.setState({ data: res.data , isLoading: false});
          });
      }

      // componentDidMount() {
      //   this.getData()
        
      //   this.subs = [
      //     this.props.navigation.addListener('willFocus', () => {
      //       this.setState({isLoading: false})
      //       this.getData()
      //     })
      //   ]
      // }
    
      // getData = async () => {
      //   try {
      //     const result = await axios.get('http://192.168.0.108:4000/engineer/read')
      //     console.log(result.data)
      //     this.setState({data: result.data.result, isLoading: false})
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }

      _sendLogout = async () => {
        isLogin = 0; 
        console.log(this.props.token);
        
        try{
            axios.defaults.headers.common['Authorization'] = this.props.token;
            await axios.get('http://192.168.0.108:4000/myhire/logout')
            axios.defaults.headers.common['Authorization'] = '0';
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
          
          const result = await axios.get(`http://192.168.0.108:4000/myhire/search/?skill=${search}`)
          console.log(result.data.result);
          this.setState({data: result.data.result})
      } catch (error) {
          console.log(error);
      }
    }

       
  render() {
    const { items } = this.state
    const { data, isLoading } = this.state
    console.log(this.props.category);
    if(isLoading){
      return(
          <ActivityIndicator size='large' style={{flex: 1, backgroundColor: '#f5f5f5', opacity: 0.5}} color='#3F51B5' />
      )
  }  
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
    
        <Content>
        <FlatGrid
              itemDimension={130}
              items={data}
              style={styles.gridView}
              renderItem={({ item, index }) => (
                  <TouchableOpacity style={styles.itemContainer} onPress={() => {this._setIdEngineer(item.created_by) } }>
                      <Image source={{ uri: `http://192.168.0.108:4000/myhire/file/${item.photo}` }} style={{ flex: 1, borderRadius: 5 }} />
                      <View style={styles.name} >
                          <Text style={{ color: '#fff', fontSize:20}}>{item.name}</Text>
                          <Text style={{ color: '#fff' }}>{item.skill}</Text>
                          
                          
                         
                      </View>
                  </TouchableOpacity>
              )}
          />
          {/* <FlatGrid>
          itemDimension={130}
        {items.map(product => (
          <Card style={{ borderRadius: 10}} key={product.id}>
         
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'Image URL'}} />
                <Body>
                  <Text>{product.name}</Text>
                  <Text note>{product.skill}</Text>
                  <TouchableOpacity onPress={() => {this._setIdEngineer(product.created_by)}}>
                  <Image source={{uri:`http://192.168.0.108:4000/myhire/file/` + product.photo }} style={{height: 150, width: 150, flex: 100}}/>
                  </TouchableOpacity>
                </Body>
               </Left>
            </CardItem>
          
            
          </Card>
          
          ))}
        </FlatGrid> */}
        </Content>
        
        {
          (!this.props.loggedIn)?
          <Footer>
            <FooterTab>
              <Button full onPress={() => this.props.navigation.navigate('Home')}>
                <Text>Login</Text>
              </Button>
            </FooterTab>
            <FooterTab>
              <Button full onPress={() => this.props.navigation.navigate('Register')}>
                <Text>Sign Up</Text>
              </Button>
            </FooterTab>
          </Footer>
          :
        <Footer>
          <FooterTab>
            <Button vertical active onPress={() => this.props.navigation.navigate('Index')}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={() =>
                  this.props.navigation.navigate('ProjectEng')
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
  }
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
      flex: 1,
  },
  name: {
      width:'100%',
      position: 'absolute',
      color: '#fff',
      backgroundColor: "rgba(0, 0, 0, 0.7)" ,
      paddingLeft: 5,
      paddingBottom: 10
      
  },

  itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 100,
      height: 200,
      position: 'relative'
  },
  itemName: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
  },
  itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
  },
});

const mapStateToProps = (state) => {
  return {
      counter: state.counterReducer.counter,
      loggedIn: state.authReducer.loggedIn,
      token: state.tokenReducer.token,
      engineerList: state,
      id: state.engineerReducer.id,
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