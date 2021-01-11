import { View, TextInput,Button,StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


import React, { Component } from 'react'; 
import 'react-native-gesture-handler';
//var ImagePicker = require('react-native-image-picker');

const axios = require('axios');
//var FormData = require('form-data');
 


Stack = createStackNavigator();


class SigninPage extends Component 
{
    constructor(props)
    {
      super(props);
      this.state = {
          "username": "",
          "password": ""
    };
    this.signinSubmit = this.signinSubmit.bind(this);
    this.call = this.call.bind(this);
    }    
    call(response)
    {
      if(response['data']['success'] == true)
      {
        this.props.navigation.navigate('home');
      }
      else
      {
        console.log('invalid user')
        this.props.navigation.navigate('signup')
      }
    }
    signinSubmit()
    {
      this.props.navigation.navigate('home');

        axios     
            .post('http://3.14.87.134:8080/api/signIn',
            {
                    "username":this.state.username,
                    "password":this.state.password,
            }            
            ).then( response => {
                console.log(response);
                this.call(response);

            })
    }    

    render(){
        return( 
            <View style = {styles.container}>
                <TextInput style = {styles.inputs}
                  underlineColorAndroid = "transparent"
                  placeholder = "username"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {text => this.setState({"username": text})}
                  />                                         
                <TextInput style = {styles.inputs}
                  underlineColorAndroid = "transparent"
                  placeholder = "your password"  
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {text => this.setState({"password": text})}
                  />                                         
                                                  
               <Button title={"submit"} style = {styles.inputs} onPress={this.signinSubmit} />   
               <Button title="want to signup?"onPress={()=>{this.props.navigation.navigate('signup')}} />
              </View>  
        );
    }
}



const styles = StyleSheet.create(
    {
          container:
          {
              flex:1,
              justifyContent:'center',
              padding:1,
              borderBottomColor: 'black'           
          },
          input: {
            margin: 15,
            height: 40,
            borderColor: '#ADD8E6',
            borderWidth: 1,
            color:'blue'
         },
    
      button:{
      backgroundColor:'#ff5c5c',
      }
      })
    