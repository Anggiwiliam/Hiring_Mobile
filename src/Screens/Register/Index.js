import React, { Component } from 'react'
import { ActivityIndiccator, ImageBackground, StyleSheet, Image, Dimensions,TouchableOpacity , TextInput } from 'react-native'
import { View, Text, Form, Item, Picker,Icon } from 'native-base'

import bgimage from '../../../Images/Rgg.png'
import logo from '../../../Images/arkademy.png'
import { } from 'react-native-gesture-handler'
import axios from 'axios'

const { width: WIDTH } = Dimensions.get('window')
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            category: '',
            selected2: undefined,
            nameValidate: true
        };
    }
    _sendProject = async () => {
        console.warn(this.state.selected2);
        
        isLogin = 0;
        try {
            const auth = await axios.post('http://35.170.248.238:7000/myhire/regis',
                {
                    username: this.state.username,
                    password: this.state.password,
                    category: this.state.selected2,
                    
                }
            )
            await this.props.navigation.navigate('Home')
        } catch (error) {
            console.log(error);
            await this.props.navigation.navigate('Register')

        }
    }

    onValueChange2(value) {
        if (value !== 'x') {
            this.setState({
              selected2: value
            });
           
          }
      }

    //   validate(text,type) {
    //       alph=/^[a-zA-Z]+$/
    //       if(type=='username')
    //       {
    //           if(alph.test(text))
    //           {
    //               this.setState({nameValidate: true})
    //           } else 
    //           {
    //             this.setState({nameValidate: false})
    //           }
    //       }
    //   }
   
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
                    style={[styles.input,!this.state.nameValidate? styles.error:null]}
                        placeholder={'Username/Email'}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                        onChangeText={value => this.setState({ username: value })}/>
                </View>
                <View style={styles.inputContainer}>
                
                    <TextInput
                    style={styles.input}
                        placeholder={'Password'}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                        onChangeText={value => this.setState({password: value})}/>
                    </View>
                    {/* <View style={styles.inputContainer}>
                
                <TextInput
                style={styles.input}
                    placeholder={'Category'}
                    placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                    underlineColorAndroid='transparent'
                    onChangeText={value => this.setState({category: value})}/>
                   </View> */}

                   
            <Item 
            picker style={styles.picker}
            >
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}

                required
              >
                  <Picker.Item label="Choose Category" value="x"  />
                  <Picker.Item label="Engineer" value="0" />
                  <Picker.Item label="Company" value="1" />
                
                
              </Picker>
            </Item>
          
                                     
                    
                    <TouchableOpacity onPress={() => { this._sendProject(this.state.selected2) }} style={styles.btnLogin}>
                        <Text style={styles.Text}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={styles.btnRegister} >
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
        width: 150,
        height: 150,
        marginBottom: 20
         },
    logoText: {
        color:'black',
        fontSize: 30,
        fontWeight: '500',
        marginTop: 10,
        marginBottom:50
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
    picker: {
        width:WIDTH -55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 0,
        marginTop:10
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
        width: WIDTH -205,
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
    },
    error: {
        borderWidth:3,
        borderColor: 'red'
    }
    
})

export default Register