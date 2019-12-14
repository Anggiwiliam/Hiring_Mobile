import React, { Component } from 'react'
import { ActivityIndiccator, ImageBackground, StyleSheet, Image, Dimensions,TouchableOpacity , TextInput } from 'react-native'
import { View, Text,Item,Input, Button, Container, Content, Card } from 'native-base'

import bgimage from '../../../Images/Rgg.png'
import logo from '../../../Images/arkademy.png'
import { } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'

const { width: WIDTH } = Dimensions.get('window')
class Register extends Component {
    constructor () {
        super()
        this.state = { 
            username: '',
            password: '',
            category: '0',
            isLoading: true,
       
        }
    }

    addRwgis = async () => {
        try {
            const response = await axios({
              method: 'post',
              url: 'http://localhost:4000/myhire/regis',
              data: {
                username: this.state.username,
                password: this.state.password,
                category: this.state.category
              }
            });
            axios.defaults.headers.common['Authorization'] = response.data.result.token;
            localStorage.setItem("Authorization", response.data.result.token);
            console.log(response.data.result.token);
            this.setState({
              isChange: '1',
              values: this.state.category
            })
          } catch (error) {
            console.log(error);
            this.setState({
              isChange: '2'
            })
          }
      }
   
    render () {
        const { isLoading, data, username, password, category } = this.state

        return (
                        
            <ImageBackground source={bgimage} style={styles.backgroundContainer}>
                <Text>{username}</Text>
                <Text>{password}</Text>
                <Text>{category}</Text>
                  
                <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo}/>
                <Text style={styles.logoText}>Register Hiring</Text>
                </View>
                
                <View style={styles.inputContainer}>
                
                    <TextInput
                    style={styles.input}
                        placeholder={'Username/Email'}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                        onChangeText={value => this.setState({username: value})}/>
                </View>
                <View style={styles.inputContainer}>
                
                    <TextInput
                    style={styles.input}
                        placeholder={'Password'}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                        onChangeText={value => this.setState({password: value})}/>
                    </View>
                    <View style={styles.inputContainer}>
                
                <TextInput
                style={styles.input}
                    placeholder={'Category'}
                    placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                    underlineColorAndroid='transparent'
                    onChangeText={value => this.setState({category: value})}/>
                   </View>
                                     
                    
                    <TouchableOpacity onPress={() => this.addRwgis()} style={styles.btnLogin}>
                        <Text style={styles.Text}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.btnRegister} >
                        <Text style={styles.Textt}>Login</Text>
                    </TouchableOpacity>
                   
            </ImageBackground>
            
        )
    }

}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 10
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 50
         },
    logoText: {
        color:'black',
        fontSize: 30,
        fontWeight: '500',
        marginTop: 10,
        // opacity: 0.5
    },
    input: {
        width:WIDTH -55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25,
    },
    itemLine: {
        width:WIDTH -65,
        height: 45,
        marginBottom: 10,
        fontSize: 16,
        left: 30,
        
        
        color: 'rgba(255, 255, 255, 0.7)',
     
    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 37
    },
    inputContainer: {
        marginTop: 10
    },
    btnEye: {
        position: 'absolute',
        top: 8,
        right: 37
    },
    btnLogin: {
        width: WIDTH -55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#432577',
        justifyContent: 'center',
        marginTop: 20
    },
    btnRegister: {
        width: WIDTH -55,
        height: 45,
        borderRadius: 25,
        
        justifyContent: 'center',
        marginTop: 20
    },
    Text: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        textAlign: 'center'
    },
    Textt: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center'
    }
    
})

export default Register