import React, { Component } from 'react'
import { ActivityIndiccator, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native'
import { View, Text, Item, Input, Button, Container, Content, Card, Form, Label, FooterTab, Footer, Icon, Header, Left, Right, Body, Subtitle, Title } from 'native-base'

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
class Detail extends Component {
    constructor() {
        super()
        this.state = {
            Detaill: ''

        }
    }

    componentDidMount() {
        this.getMyData();
    }

    async getMyData() {
        try {
            axios.defaults.headers.common['Authorization'] = this.props.token;
            const profile = await axios.get(`http://192.168.0.108:4000/engineer/by/${this.props.id}`)
            console.log(profile.data[0]);

            await this.setState({
                Detaill: profile.data[0]

            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        console.log(this.props.id);
        return (

            <Container>
                <Header>
                    <Button transparent>
                        <Icon name='arrow-back' onPress={() => this.props.navigation.goBack()} />
                    </Button>
                    <Left />
                    <Body>
                        <Title style={{ alignSelf: 'center' }}>Detail</Title>
                        <Subtitle style={{ alignSelf: 'center', fontSize: 20 }}>Engineer</Subtitle>

                    </Body>
                    <Right />
                </Header>
                <SafeAreaView style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.titlebar}>

                        </View>
                        <View style={{ alignSelf: "center" }}>
                            <View style={styles.profileimage}>
                                <Image source={{ uri: `http://192.168.0.108:4000/myhire/file/${this.state.Detaill.photo}` }} style={styles.image} resizeMode="center"></Image>
                            </View>


                        </View>
                        <View style={styles.infocontainer}>
                            <Text style={[styles.text, { fontWeight: '200', fontSize: 36 }]}>{this.state.Detaill.name}</Text>
                            <Text style={[styles.text, { color: '#AEB5BC', fontSize: 20 }]}>{this.state.Detaill.date_of_birth}</Text>
                            <Text style={[styles.text, { color: '#AEB5BC', fontSize: 20 }]}>{this.state.Detaill.email}</Text>
                            <Text style={[styles.text, { color: '#AEB5BC', fontSize: 20 }]}>{this.state.Detaill.phone_number}</Text>
                            <Text style={[styles.text, { color: '#AEB5BC', fontSize: 20 }]}>{this.state.Detaill.location}</Text>
                            <Text style={[styles.text, { color: '#AEB5BC', fontSize: 20 }]}>{this.state.Detaill.showcase}</Text>
                            <Text style={[styles.text, { color: '#AEB5BC', fontSize: 20 }]}>{this.state.Detaill.skill}</Text>
                            <Text style={[styles.text, { color: '#AEB5BC', fontSize: 20 }]}>{this.state.Detaill.description}</Text>
                        </View>
                        <Button style={{ alignSelf: 'center', marginTop: 10, borderRadius: 10 }} onPress={() => this.props.navigation.navigate('Hiring')}>
                            <Text>Hire Me</Text>
                        </Button>
                    </ScrollView>

                </SafeAreaView>

                <Footer>
                    <FooterTab>
                        <Button vertical onPress={() => this.props.navigation.navigate('Index')}>
                            <Icon name="home" />
                            <Text>Home</Text>
                        </Button>

                        <Button vertical active onPress={() => this.props.navigation.navigate('ProfilC')}>
                            <Icon name="person" />
                            <Text>Profil</Text>
                        </Button>
                    </FooterTab>
                </Footer>


            </Container>

        )
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
        overflow: "hidden",
        borderColor: 'black'
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
        id: state.engineerReducer.id
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



export default connect(mapStateToProps, mapDispatchToProps)(Detail)