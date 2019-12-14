import React from 'react'
import { ActivityIndiccator, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import { View, Text, Button, Container, Content, Card, Icon } from 'native-base'

import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { compose } from "redux";

import { login } from '../../../redux/actions/authActions'
import { increaseCounter, descreaseCounter } from '../../../redux/actions/counterActions'
import { getEngineer } from '../../../redux/actions/engineerActions'
import { jwt } from '../../../redux/actions/tokenAction'
import axios from 'axios'


import bgimage from '../../../Images/Bg.jpg'
import logo from '../../../Images/arkademy.png'
import { } from 'react-native-gesture-handler'
// import Icon from 'react-native-vector-icons/Ionicons'

const { width: WIDTH } = Dimensions.get('window')

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
        marginBottom: 50
    },
    logoText: {
        color: 'white',
        fontSize: 30,
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.5
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25,
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
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#432577',
        justifyContent: 'center',
        marginTop: 20
    },
    btnRegister: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,

        justifyContent: 'center',
        marginTop: 20
    },
    Text: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        textAlign: 'center'
    }

})

let isLogin = 0;
class Home extends React.Component {
    constructor(props) {
        super()
        this.state = {
           
            isLoading: true,
            showPass: true,
            press: false
        }
        
    }
    showPass = () => {
        if (this.state.press == false) {
            this.setState({ showPass: false, press: true })
        } else {
            this.setState({ showPass: true, press: false })
        }
    }

    _sendLogin = async () => {
        isLogin = 0;
        try{
            const auth = await axios.post('http://192.168.1.5:4000/myhire/login',
            {
                username: this.state.username,
                password: this.state.password
            }
            )
            await console.log(this.props.token);
            axios.defaults.headers.common['Authorization'] = auth.data.result.token;
            await this.props.reduxLogin(true)
            await this.props.reduxToken(auth.data.result.token)
            await this.props.navigation.navigate('Index')
        }catch(error){
            console.log(error);
        }
    }


    


    render() {
        const { handleSubmit, createUser } = this.props;

        return (

            <ImageBackground source={bgimage} style={styles.backgroundContainer}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.logoText}>Login Hiring Mobile</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="person" size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder={'Username'}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                        name='username'
                        onChangeText={value => this.setState({username: value})} />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="apps" size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder={'Password'}
                        secureTextEntry={this.state.showPass}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                        onChangeText={value => this.setState({password: value})} />
                    <TouchableOpacity style={styles.btnEye}
                        onPress={this.showPass.bind(this)}>
                        <Icon name={this.state.press == false ? "eye" : "eye"} size={26} color={'rgba(255, 255, 255, 0.7)'} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btnLogin} onPress={() => {this._sendLogin()}} onPress={() => this._sendLogin()}>
                    <Text style={styles.Text}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={styles.btnRegister} >
                    <Text style={styles.Text}>Register</Text>
                </TouchableOpacity>
                
            </ImageBackground>

        )
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
        reduxEngineer: () => dispatch(getEngineer())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)   (Home)