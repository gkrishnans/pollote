import { View, TextInput,Button,StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


import React, { Component } from 'react'; 
import 'react-native-gesture-handler';
//var ImagePicker = require('react-native-image-picker');

const axios = require('axios');
//var FormData = require('form-data');
 


Stack = createStackNavigator();

class SignupPage extends Component 
{
    constructor(props)
    {
      super(props);
      this.state = {
        "username":"",
        "email":"",
        "password":"",
    };
    this.signupSubmit = this.signupSubmit.bind(this);
    }

    signupSubmit()
    {
        this.props.navigation.navigate('home');

        axios     
            .post('http://3.14.87.134:8080/api/signup',
            {
                    "username":this.state.username,
                    "password":this.state.password,
                    "email":this.state.email,
            }            
            ).then( response => {
                console.log(response);
                this.props.navigation.navigate('home');
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
                <TextInput style = {styles.inputs}
                  underlineColorAndroid = "transparent"
                  placeholder = "your email id"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {text => this.setState({"email": text})}
                  />                                         
               <Button title={"submit"} style = {styles.inputs} onPress={this.signupSubmit} />   
               <Button title={"want to signin?"} onPress={()=>{this.props.navigation.navigate('signin')}}/>
         
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
    