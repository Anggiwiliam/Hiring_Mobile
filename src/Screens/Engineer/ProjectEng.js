import React, { Component } from 'react'
import { ActivityIndiccator, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native'
import { View, Text, Item, Input, Button, Container, Content, Card, Form, Label, FooterTab, Footer, Icon, Header, Left, List, ListItem, Body, Right ,Title,Subtitle} from 'native-base'

import bgimage from '../../../Images/icon++.png'
import logo from '../../../Images/arkademy.png'
import { } from 'react-native-gesture-handler'

import { connect } from "react-redux";
import { login } from '../../../redux/actions/authActions'
import { increaseCounter, descreaseCounter } from '../../../redux/actions/counterActions'
import { getEngineer } from '../../../redux/actions/engineerActions'
import { jwt } from '../../../redux/actions/tokenAction'
import axios from 'axios'



const { width: WIDTH } = Dimensions.get('window')
class ProjectEng extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: []
    }
  }

  componentDidMount() {
    this._getProject()
  }

  _getProject = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = this.props.token;
      const auth = await axios.get('http://192.168.0.108:4000/myhire/readproject')
      console.log(auth.data.result);
      await this.setState({
        project: auth.data.result
      })
    } catch (error) {
      console.log(error);
    }
  }

  _changeStatus = async(id, status) =>{
    try{
      console.log(id);
      
      axios.defaults.headers.common['Authorization'] = this.props.token;
      const auth = await axios.put('http://192.168.0.108:4000/myhire/statusproject',
        {
          id,
          status 
        }
      )
      this._getProject()
    }catch(error){
        console.log(error);
    }
  }
  render() {
    const { project } = this.state;
    if (!project.length) {
      return (
        <Container>
           <Header>
          <Button transparent>
            <Icon name='arrow-back' onPress={() => this.props.navigation.goBack()} />
          </Button>
          <Left />
          <Body>
            <Title style={{ alignSelf: 'center' }}>List Project</Title>
            <Subtitle style={{ alignSelf: 'center', fontSize: 20 }}>Company</Subtitle>

          </Body>
          <Right />
        </Header>
          <Content>
            <View>
              <Text style={{alignSelf:'center', marginTop:300}}>
                Project list is empty!
                  </Text>
                  
            </View>
          </Content>
          
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => this.props.navigation.navigate('Index')}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>

            <Button vertical active onPress={() => this.props.navigation.navigate('ListP')}>
              <Icon name="list" />
              <Text>List</Text>
            </Button>
          </FooterTab>
        </Footer>

        </Container>
      )
    }
    return (
      <Container>
        <Header>
          <Button transparent>
            <Icon name='arrow-back' onPress={() => this.props.navigation.goBack()} />
          </Button>
          <Left />
          <Body>
            <Title style={{ alignSelf: 'center' }}>List Project</Title>
            <Subtitle style={{ alignSelf: 'center', fontSize: 20 }}>Engineer</Subtitle>

          </Body>
          <Right />
        </Header>
        <Content>
          <List style={{marginTop:20, borderRadius:10}}>
            {
                project.map((data, index) => (
                  <ListItem key={index}>
                    <Body>
                      <Text style={{margin: 15}}>{data.name}</Text>
                      <Text note>Rp.{data.budget}</Text>
                    </Body>
                    <View>
                    
                    { 
                          (!data.status)&&
                          <Button      
                          onPress={() => {this._changeStatus(data.id, 1)}}
                          style={{backgroundColor:"blue", width:100, height: 30, justifyContent:"center", borderRadius: 10, margin: 2}}
                        >
                        <Text>Accept</Text>
                        </Button>
                    }
                    {
                        (!data.status)&&
                          <Button      
                            onPress={() => {this._changeStatus(data.id, 2)}}
                            style={{backgroundColor:"red", width:100, height: 30, justifyContent:"center", borderRadius: 10, margin: 2}} 
                          >
                          <Text>Decline</Text>
                          </Button>
                    }
                    {
                        (data.status === 1)&&
                          <Icon name="paper-plane" style={{margin: 2, fontSize:20, color:"blue"}}></Icon>
                    }
                    {
                        (data.status === 2)&&
                        <Icon name="refresh" style={{margin: 2, fontSize:20, color:"red"}}></Icon>
                        
                    }
                    </View>
                  </ListItem>
                ))
            }
          </List>
        </Content>
        
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => this.props.navigation.navigate('Index')}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>

            <Button vertical active onPress={() => this.props.navigation.navigate('ListP')}>
              <Icon name="list" />
              <Text>List</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'HelveticaNeve',
    color: '#52575D',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  titlebar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16
  },
  profileimage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden"
  },
  infocontainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    marginBottom: 30
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
})
const mapStateToProps = (state) => {
  return {
    counter: state.counterReducer.counter,
    loggedIn: state.authReducer.loggedIn,
    token: state.tokenReducer.token,
    id: state.engineerReducer.id,
    engineerList: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxIncreaseCounter: () => dispatch(increaseCounter()),
    reduxDecreaseCounter: () => dispatch(descreaseCounter()),
    reduxLogin: (trueFalse) => dispatch(login(trueFalse)),
    reduxToken: (token) => dispatch(jwt(token)),
    reduxEngineer: (id) => dispatch(getEngineer(id))
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(ProjectEng)