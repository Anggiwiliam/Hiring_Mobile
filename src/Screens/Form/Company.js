import React, { Component } from 'react'
import { ActivityIndiccator, ImageBackground, StyleSheet, Image, Dimensions,TouchableOpacity , TextInput } from 'react-native'
import { View, Text,Item,Input, Button, Container, Content, Card,Form , Label} from 'native-base'

import bgimage from '../../../Images/Rgg.png'
import logo from '../../../Images/arkademy.png'
import { } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'

const { width: WIDTH } = Dimensions.get('window')
class Company extends Component {
    constructor () {
        super()
        this.state = { 
            isLoading: true,
       
        }
    }
   
    render () {

        return (
            
        <Container>
        
        <Content>
            <Text style={styles.Text}>Form </Text>
        <Form>
            <Item floatingLabel last style={styles.input}>
              <Label>Full Name</Label>
              <Input />
            </Item>
            <Item floatingLabel last style={styles.input}>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel last style={styles.input}>
              <Label>Phone Number</Label>
              <Input />
            </Item>
            <Item floatingLabel last style={styles.input}>
              <Label>Location</Label>
              <Input />
            </Item>
            <Item floatingLabel last style={styles.input}>
              <Label>Description</Label>
              <Input />
            </Item>
            <Item floatingLabel last style={styles.input}>
              <Label>Logo</Label>
              <Input type='file' />
            </Item>
            <Button rounded style={styles.btnCompany}>
            <Text style={styles.Textt}>Save</Text>
          </Button>
          </Form>
        </Content>
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
        color:'black',
        fontSize: 30,
        fontWeight: '500',
        marginTop: 10,
        // opacity: 0.5
    },
    input: {
        width:WIDTH -65,
        height: 45,
        marginBottom: 5,
        fontSize: 10,
        left: 30,
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
    Save: {
        width: WIDTH -55,
        justifyContent: 'center',
        marginTop: 20
    },
    btnLogin: {
        width:WIDTH -65,
        height: 45,
        marginBottom: 5,
        fontSize: 10,
        left: 30,
    },
    btnCompany: {
        width:WIDTH -65,
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

export default Company