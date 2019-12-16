import React, { Component } from 'react'
import { Container, Header, Content, Form, Item, Picker, Icon, Button, Text, View, Footer, FooterTab, Left,Body, Title,Subtitle,Right } from 'native-base'

import { connect } from "react-redux";
import { login } from '../../../redux/actions/authActions'
import { increaseCounter, descreaseCounter } from '../../../redux/actions/counterActions'
import { getEngineer } from '../../../redux/actions/engineerActions'
import { jwt } from '../../../redux/actions/tokenAction'
import axios from 'axios'

class Hiring extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined,
      project: []
    };
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  componentDidMount() {
    this._getProject()
  }

  _getProject = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = this.props.token;
      const auth = await axios.get('http://192.168.0.108:4000/myhire/readproject')
      console.log(auth.data.result);
      await this.setState({
        project: auth.data.result
      })
    } catch (error) {
      console.log(error);
    }
  }

  _sendProject = async (id) => {
    const { project } = this.state;
    const selected = project[id];
    console.log(selected);
    console.log(id);
    try {
      axios.defaults.headers.common['Authorization'] = this.props.token;
      const auth = await axios.put('http://192.168.0.108:4000/myhire/changeproject',
        {
          id: selected.id,
          done: selected.done,
          name: selected.name,
          budget: selected.budget,
          description: selected.description,
          skill: selected.skill,
          id_engineer: this.props.id,
        }
      )


      console.log('send!');
      await this.props.navigation.navigate('Detail')

    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { project } = this.state;
    return (
      <Container>
        <Header>
          <Button transparent>
            <Icon name='arrow-back' onPress={() => this.props.navigation.goBack()} />
          </Button>
          <Left />
          <Body>
            <Title style={{ alignSelf: 'center' }}>List Project</Title>
            <Subtitle style={{ alignSelf: 'center', fontSize: 20 }}>Engineer</Subtitle>

          </Body>
          <Right />
        </Header>
        <Content>
          <Container>
          

            <Item picker style={{marginTop:200, marginLeft:30, marginRight:30}}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your Project"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                {
                  project.map((data, index) => (
                    <Picker.Item label={data.name} value={index} />
                  ))
                }
              </Picker>
            </Item>
          
          <Button
            style={{ margin: 140, borderRadius: 10, marginTop: 100 }}
            onPress={() => { this._sendProject(this.state.selected2) }}>
            <Text style={{ alignSelf:'center' }}>
              Send
                  </Text>
          </Button>
          </Container>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => this.props.navigation.navigate('Index')}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>

            <Button vertical active onPress={() => this.props.navigation.navigate('Hiring')}>
              <Icon name="person" />
              <Text>Hiring</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
    )
  }
}


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



export default connect(mapStateToProps, mapDispatchToProps)(Hiring)