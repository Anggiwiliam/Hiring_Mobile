import React, { Component } from 'react'
import { ActivityIndiccator, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native'
import { View, Text, Item, Input, Button, Container, Content, Card, Form, Label, FooterTab, Footer, Icon, Header, Left, List, ListItem, Body, Right } from 'native-base'

import bgimage from '../../../Images/Rgg.png'
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
    constructor(props){
        super(props);
        this.state={
          project: []
        }
      }
  
      componentDidMount(){
        this._getProject()  
      }
  
      _getProject = async () => {
          try{
            axios.defaults.headers.common['Authorization'] = this.props.token;
            const auth = await axios.get('http://192.168.1.5:4000/myhire/readproject')
            console.log(auth.data.result);
            await this.setState({
              project: auth.data.result
            })
          }catch(error){
              console.log(error);
          }
      }
  
      _changeDone = async(id, done) =>{
        try{
          console.log(id);
          
          axios.defaults.headers.common['Authorization'] = this.props.token;
          const auth = await axios.put('http://192.168.1.5:4000/myhire/doneproject',
            {
              id: id,
              done: (done)?0:1
            }
          )
          this._getProject()
        }catch(error){
            console.log(error);
        }
      }
    render() {
        const { project } = this.state;
        if(!project.length) {
          return(
            <Container>
              <Header>
                <Left>
                  <Button
                    onPress = {()=>{this.props.navigation.navigate('addProject')}}
                  >
                    <Text>
                      Add Project
                    </Text>
                  </Button>
                </Left>
              </Header>
              <Content>
                <View>
                  <Text>
                    Project list is empty!
                  </Text>
                </View>
              </Content> 
            </Container> 
          )
        }
      return (
        <Container>
        <Header style={{borderColor:'blue'}}>
          <Left>
            <Button style={{backgroundColor:'white'}}
              onPress = {()=>{this.props.navigation.navigate('addProject')}}
            >
              <Text style={{color:'black'}}>
                Add Project
              </Text>
            </Button>
          </Left>
        </Header>
        <Content>
          <List>
              <Text style={{marginTop:50,marginBottom:50,fontSize:30,textAlign:'center'}}>List Project Company</Text>
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
                    {
                        (data.done != '1')?
                          <Button   style={{marginBottom: 10, borderRadius:10}}   
                            onPress={() => {this._changeDone(data.id, 1)}}
                          >
                          <Text>On Prog</Text>
                          </Button>
                          :
                          <Button  style={{marginBottom: 5}}    
                          onPress={() => {this._changeDone(data.id, 0)}}
                        >
                        <Text>Done</Text>
                        </Button>
                    }
                    {
                      (data.status != '1')?
                        <Text note style={{backgroundColor: 'red', color: 'white', borderRadius:20}}>delayed</Text> 
                        :
                        <Text note style={{backgroundColor: 'blue', color: 'white'}}>accept</Text>
                    }
                    </Right>
                  </ListItem>
                ))
            }
          </List>
        </Content>
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
    }
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