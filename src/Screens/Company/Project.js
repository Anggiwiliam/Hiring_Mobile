import React, { Component } from 'react'
import { ActivityIndiccator, ImageBackground, StyleSheet, Image, Dimensions,TouchableOpacity , TextInput } from 'react-native'
import { View, Text,Item,Input, Button, Container, Content, Card,Form , Label} from 'native-base'

import bgimage from '../../../Images/Rgg.png'
import logo from '../../../Images/arkademy.png'
import { } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'

import { connect } from "react-redux";
import { login } from '../../../redux/actions/authActions'
import { increaseCounter, descreaseCounter } from '../../../redux/actions/counterActions'
import { getEngineer } from '../../../redux/actions/engineerActions'
import { jwt } from '../../../redux/actions/tokenAction'
import axios from 'axios'

const { width: WIDTH } = Dimensions.get('window')
class Project extends Component {
    constructor () {
        super()
        this.state = { 
            isLoading: true,
       
        }
    }
   
    render () {
        console.log(this.props.engineerList);
        return (
            
            <SafeAreaView style={styles.container}>

            <View style={styles.loggedInContainer}>
              <Text style={styles.loggedInText}>Logged In: </Text>
              <Text style={styles.loggedInText}>{`${this.props.loggedIn}`}</Text>
    
              <Button
                title="Login"
                onPress={this.props.loggedIn === false ? () => this.props.reduxLogin(true) : () => this.props.reduxLogin(false)}
                style={styles.loginButton}
              />
            </View>
    
            <Text style={styles.counterTitle}>Counter</Text>
    
            <View style={styles.counterContainer}>
              <TouchableOpacity onPress={() => this.props.reduxIncreaseCounter()}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
    
              <Text style={styles.counterText}>{this.props.counter}</Text>
    
              <TouchableOpacity onPress={() => this.props.reduxDecreaseCounter()}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
            </View>
    
          </SafeAreaView>
        )
      }
    }
    

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        loggedInContainer: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 40,
        },
        loginButton: {
          marginTop: 20,
          paddingTop: 20,
        },
        counterContainer: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        loggedInText: {
          fontFamily: 'System',
          fontSize: 17,
          fontWeight: '400',
          color: '#000',
        },
        counterTitle: {
          fontFamily: 'System',
          fontSize: 32,
          fontWeight: '700',
          color: '#000',
        },
        counterText: {
          fontFamily: 'System',
          fontSize: 36,
          fontWeight: '400',
          color: '#000',
        },
        buttonText: {
          fontFamily: 'System',
          fontSize: 50,
          fontWeight: '300',
          color: '#007AFF',
          marginLeft: 40,
          marginRight: 40,
        },
      });
      
const mapStateToProps = (state) => {
    return {
        counter: state.counterReducer.counter,
        loggedIn: state.authReducer.loggedIn,
        engineerList: state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        reduxIncreaseCounter: () => dispatch(increaseCounter()),
        reduxDecreaseCounter: () => dispatch(descreaseCounter()),
        reduxLogin: (trueFalse) => dispatch(login(trueFalse)),
        reduxEngineer: (id) => dispatch(getEngineer(id))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Project)