import React, { Component } from 'react'
import { ActivityIndiccator, ImageBackground, StyleSheet, Image, Dimensions,TouchableOpacity , TextInput,SafeAreaView,ScrollView } from 'react-native'
import { View, Text,Item,Input, Button, Container, Content, Card,Form , Label, FooterTab,Footer, Icon, Header,Left,Right,Title,Subtitle,Body} from 'native-base'

import bgimage from '../../../Images/Rgg.png'
import logo from '../../../Images/arkademy.png'
import { } from 'react-native-gesture-handler'



const { width: WIDTH } = Dimensions.get('window')
class Profile extends Component {
    constructor () {
        super()
        this.state = { 
            isLoading: true,
       
        }
    }
   
    render () {

        return (
            
        <Container>
             <Header>
                    <Button transparent>
                        <Icon name='arrow-back' onPress={() => this.props.navigation.goBack()} />
                    </Button>
                    <Left />
                    <Body>
                        <Title style={{ alignSelf: 'center' }}>Profil</Title>
                    </Body>
                    <Right />
                </Header>
        <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.titlebar}>

                    </View>
                    <View style={{ alignSelf: "center"}}>
                        <View style={styles.profileimage}>
                            <Image source={require("../../../Images/Bg.jpg")} style={styles.image} resizeMode="center"></Image>
                        </View>

                    </View>
                    <View style={styles.infocontainer}>
                        <Text style={[styles.text,{fontWeight:'200', fontSize:36}]}>Anggi Gusti Wiliam</Text>
                        <Text style={[styles.text,{color:'#AEB5BC', fontSize:16}]}>Full-Stack</Text>
                        <Text style={[styles.text,{color:'#AEB5BC', fontSize:16}]}>Php</Text>
                        <Text style={[styles.text,{color:'#AEB5BC', fontSize:16}]}>Padang</Text>
                        <Text style={[styles.text,{color:'#AEB5BC', fontSize:16}]}>21-08-1994</Text>
                        <Text style={[styles.text,{color:'#AEB5BC', fontSize:16}]}>anggiwiliam94@gmail.com</Text>
                        <Text style={[styles.text,{color:'#AEB5BC', fontSize:16}]}>Smart</Text>
                        <Text style={[styles.text,{color:'#AEB5BC', fontSize:16}]}>www.github.com/Anggiwiliam</Text>
                    </View>
                    <Button style={{ alignSelf: 'center', marginTop: 20, borderRadius: 10 }} onPress={() => this.props.navigation.navigate('ListP')}>
                            <Text>List Project</Text>
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
    text:{
        fontFamily:'HelveticaNeve',
        color: '#52575D',
    },
    image:{
        flex: 1,
        width: undefined,
        height:undefined
    },
    titlebar:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        marginHorizontal:16
    },
    profileimage: {
        width: 200,
        height:200,
        borderRadius: 100,
        overflow: "hidden"
    },
    infocontainer:{
        alignSelf:'center',
        alignItems:'center',
        marginTop: 16
    }
})


export default Profile