
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { View, TextInput,Image ,ScrollView,Text,Button,StyleSheet,TouchableOpacity} from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Canvas from 'react-native-canvas';

import Subpoll from './routes/Subpoll'
import Createpoll from './routes/Createpoll'
import SigninPage from './routes/SigninPage'
import SignupPage from './routes/SignupPage'

import React, { Component } from 'react'; 
import 'react-native-gesture-handler';
//var ImagePicker = require('react-native-image-picker');

const axios = require('axios');
//var FormData = require('form-data');
 


Stack = createStackNavigator();
function home ({navigation})
{
    return( 
        <View style = {styles.container}>
            <Button title="CreatePoll" onPress={() => navigation.navigate("create")} />
            <Button title="GetPolls" onPress={() => navigation.navigate("sub")} />
        </View>  
    );      
}

export default function App()
{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="signup">
      <Stack.Screen name= "signup"  component= {SignupPage} options={{ title: 'polloteSignup' }}/>
        <Stack.Screen name= "home"  component={home} options={{ title: 'logged in' }}/>
        <Stack.Screen name= "signin"  component={SigninPage} options={{ title: 'polloteSignin' }}/>
        <Stack.Screen name= "create"  component= {Createpoll} options={{ title: 'logged in:create a poll' }}/>
        <Stack.Screen name= "sub"  component={Subpoll} options={{ title: 'logged in:get a poll' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
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
  options:
  {
    marginTop:3,
    padding:10,
    backgroundColor:'#000000',
  },
  button:{
  backgroundColor:'#ff5c5c',
  }

  })
