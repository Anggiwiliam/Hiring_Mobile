import React, { Component } from 'react'
import { Container, Header, Content, Form, Item, Picker, Icon, Button, Text, View} from 'native-base'

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
    
       _sendProject = async (id) => {
        const {project} = this.state;
        const selected = project[id];
        console.log(selected);
        console.log(id);
        try{
          axios.defaults.headers.common['Authorization'] = this.props.token;
          const auth = await axios.put('http://192.168.1.5:4000/myhire/changeproject',
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
          
        }catch(error){
          console.log(error)
        }
       }

    render() {
        const {project} = this.state;
        return (
            <Container>
            <Header />
            <Content>
              <Form>
              <Icon style={{paddingRight:10}} name="arrow-back" onPress={() => this.props.navigation.goBack()}></Icon>
            
                  <Text style={{marginBottom:60, textAlign:'center', marginTop:30, fontSize:30,}}>List Project Company</Text>
                <Item picker>
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
              </Form>
              <Button 
                    style={{margin: 15, borderRadius: 10, marginTop:30}} 
                    onPress = {()=>{this._sendProject(this.state.selected2)}}
                    // onPress={()=>{ this._sendProject(data.id, data.name, data.skill, data.description, data.budget, data.done)}}
                >
                  <Text style={{textAlign:'center', paddingRight:30}}>
                    Send
                  </Text>
                </Button>
            </Content>
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
    return{
        reduxIncreaseCounter: () => dispatch(increaseCounter()),
        reduxDecreaseCounter: () => dispatch(descreaseCounter()),
        reduxLogin: (trueFalse) => dispatch(login(trueFalse)),
        reduxToken: (token) => dispatch(jwt(token)),
        reduxEngineer: (id) => dispatch(getEngineer(id))
    };
  };
  
  
  
  export default connect(mapStateToProps, mapDispatchToProps)   (Hiring)