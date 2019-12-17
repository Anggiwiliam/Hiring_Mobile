import React, { Component } from 'react'
import { ActivityIndiccator, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity,ActivityIndicator, TextInput, SafeAreaView, ScrollView } from 'react-native'
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
class ListP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    this._getProject()
    this.subs = [
      this.props.navigation.addListener('willFocus', () => {
        this.setState({isLoading: false})
        this._getProject()
      })
    ]
  }

  _getProject = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = this.props.token;
      const auth = await axios.get('http://35.170.248.238:7000/myhire/readproject')
      console.log(auth.data.result);
      await this.setState({
        project: auth.data.result,isLoading: false
            })
    } catch (error) {
      console.log(error);
    }
  }

  _changeDone = async (id, done) => {
    try {
      console.log(id);

      axios.defaults.headers.common['Authorization'] = this.props.token;
      const auth = await axios.put('http://35.170.248.238:7000/myhire/doneproject',
        {
          id: id,
          done: (done) ? 0 : 1
        }
      )
      this._getProject()
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { project, isLoading } = this.state;
    if(isLoading){
      return(
          <ActivityIndicator size='large' style={{flex: 1, backgroundColor: '#f5f5f5', opacity: 0.5}} color='#3F51B5' />
      )
  }
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
          <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => { this.props.navigation.navigate('addProject') }}
          style={styles.TouchableOpacityStyle}>
          <Image
            //We are making FAB using TouchableOpacity with an image
            //We are using online image here
            source={bgimage}
            //You can use you project image Example below
            //source={require('./images/float-add-icon.png')}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
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
            <Subtitle style={{ alignSelf: 'center', fontSize: 20 }}>Company</Subtitle>

          </Body>
          <Right />
        </Header>
       
        <Content>
          <List style={{ marginTop: 20, marginBottom: 50 }}>

            <Card style={{borderRadius:20}}>
              {
                project.map((data, index) => (
                  <ListItem key={index}>
                    <Body>
                      <Text>{data.name}</Text>
                      <Text>{data.budget}</Text>
                      <Text note>id engineer :{data.id_engineer}</Text>
                      <Text note>id company :{data.id_company}</Text>
                    </Body>
                    <Right>
                      {/* {
                        (data.done != '1') ?
                          <Button style={{ marginBottom: 10, borderRadius: 5,backgroundColor:'#5454' }}
                            onPress={() => { this._changeDone(data.id, 1) }}
                          >
                            <Text style={{color:'black'}}>On Prog</Text>
                            
                          </Button>
                          :
                          <Button style={{ marginBottom: 5 }}
                            onPress={() => { this._changeDone(data.id, 0) }}
                          >
                            <Text>Done</Text>
                          </Button>
                      } */}
                     {

                        
((data.id_engineer !== null)&&(data.status === 0))&&
<Text note style={{borderRadius: 3, textAlign: "center", backgroundColor: '#FFC300', color: 'black', width: 80, height:20, position:"absolute", alignSelf:"center", right:0}}>On Process</Text> 
}
{
(data.status === 1)&&
  <Text note style={{borderRadius: 3, textAlign: "center",backgroundColor: 'green', color: 'white', width: 70, height:20, position:"absolute", alignSelf:"center", right:0}}>Accept</Text>
}
                    </Right>
                  </ListItem>
                ))
              }
            </Card>

          </List>

        </Content>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => { this.props.navigation.navigate('addProject') }}
          style={styles.TouchableOpacityStyle}>
          <Image
            //We are making FAB using TouchableOpacity with an image
            //We are using online image here
            source={bgimage}
            //You can use you project image Example below
            //source={require('./images/float-add-icon.png')}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
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



export default connect(mapStateToProps, mapDispatchToProps)(ListP)