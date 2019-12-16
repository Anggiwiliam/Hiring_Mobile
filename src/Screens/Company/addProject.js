import React, { Component } from 'react'
import { ActivityIndiccator, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import { View, Text, Item, Input, Button, Container, Content, Card, Form, Label, FooterTab, Footer, Icon, Header, Left, Body, Right,Title,Subtitle } from 'native-base'

import bgimage from '../../../Images/Rgg.png'
import logo from '../../../Images/arkademy.png'
import { } from 'react-native-gesture-handler'


import { connect } from "react-redux";
import { login } from '../../../redux/actions/authActions'
import { increaseCounter, descreaseCounter } from '../../../redux/actions/counterActions'
import { getEngineer } from '../../../redux/actions/engineerActions'
import { jwt } from '../../../redux/actions/tokenAction'
import { role } from '../../../redux/actions/categoryActions'
import axios from 'axios'

const { width: WIDTH } = Dimensions.get('window')
class addProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            skill: '',
            description: '',
            id_engineer: '',
            done: '',
            budget: ''
        }
    }
    _sendProject = async () => {
        isLogin = 0;
        try {
            const auth = await axios.post('http://192.168.0.108:4000/myhire/createproject',
                {
                    name: this.state.name,
                    skill: this.state.skill,
                    description: this.state.description,
                    budget: this.state.budget
                }
            )
            await this.props.navigation.navigate('ListP')
        } catch (error) {
            console.log(error);

        }
    }

    render() {

        return (

            <Container>
                <Header>
                    <Button transparent>
                        <Icon name='arrow-back' onPress={() => this.props.navigation.goBack()} />
                    </Button>
                    <Left />
                    <Body>
                        <Title style={{ alignSelf: 'center' }}>Form Project</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>

                    
                    <Form>
                        <Item floatingLabel last style={styles.input}>
                            <Label>Name Project</Label>
                            <Input onChangeText={value => this.setState({ name: value })} />
                        </Item>
                        <Item floatingLabel last style={styles.input}>
                            <Label>Skill</Label>
                            <Input onChangeText={value => this.setState({ skill: value })} />
                        </Item>
                        <Item floatingLabel last style={styles.input}>
                            <Label>Budget</Label>
                            <Input onChangeText={value => this.setState({ budget: value })} />
                        </Item>
                        <Item floatingLabel last style={styles.input}>
                            <Label>Description</Label>
                            <Input onChangeText={value => this.setState({ description: value })} />
                        </Item>
                        <Button rounded onPress={() => { this._sendProject() }} style={styles.btnCompany} >
                            <Text>Save</Text>
                        </Button>
                    </Form>
                </Content>

                <Footer>
                    <FooterTab>
                        <Button vertical onPress={() => this.props.navigation.navigate('Index')}>
                            <Icon name="home" />
                            <Text>Home</Text>
                        </Button>

                        <Button vertical active onPress={() => this.props.navigation.navigate('addProject')}>
                            <Icon name="person" />
                            <Text>Add</Text>
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>

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
        color: 'black',
        fontSize: 30,
        fontWeight: '500',
        marginTop: 10,
        // opacity: 0.5
    },
    input: {
        width: WIDTH - 65,
        height: 45,
        marginBottom: 5,
        fontSize: 10,
        left: 30,
    },
    itemLine: {
        width: WIDTH - 65,
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
    Save: {
        width: WIDTH - 55,
        justifyContent: 'center',
        marginTop: 20
    },
    btnLogin: {
        width: WIDTH - 65,
        height: 45,
        marginBottom: 5,
        fontSize: 10,
        left: 30,
    },
    btnCompany: {
        width: WIDTH - 65,
        height: 45,
        marginBottom: 5,
        fontSize: 10,
        left: 30,

        justifyContent: 'center',
        marginTop: 40
    },
    Text: {
        marginTop: 10,
        color: 'black',
        fontSize: 25,
        textAlign: 'center'
    },
    Textt: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    }

})

const mapStateToProps = (state) => {
    return {
        counter: state.counterReducer.counter,
        loggedIn: state.authReducer.loggedIn,
        token: state.tokenReducer.token,
        id: state.engineerReducer.id,
        // category: state.categoryReducer.category,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        reduxIncreaseCounter: () => dispatch(increaseCounter()),
        reduxDecreaseCounter: () => dispatch(descreaseCounter()),
        reduxLogin: (trueFalse) => dispatch(login(trueFalse)),
        reduxToken: (token) => dispatch(jwt(token)),
        reduxEngineer: (id) => dispatch(getEngineer(id)),
        reduxCategory: (category) => dispatch(role(category)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(addProject)