import {launchImageLibrary} from 'react-native-image-picker';
import { View, TextInput,Image ,StyleSheet,ScrollView,Button} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import FormData from 'form-data'

import React, { Component } from 'react'; 
import 'react-native-gesture-handler';
//var ImagePicker = require('react-native-image-picker');

const axios = require('axios');
//var FormData = require('form-data');
 


Stack = createStackNavigator();


class Createpoll extends Component 
//any variable intialised in the class will be initialised in the construction and the 
//presence of the method that should be bind inside the constructor
//those declared variables can be accessed by this.variable_name
//all the variables required are only initialised in state
//when those state variables wanted to change/modified they can be done using setState method
{
    constructor()
    {
        super();
        this.state = {
          "var_Category":"",
          "var_Created_by":"",
          "var_Poll_question":"",
          "var_sub_category":"",
          "time":this.getEpoch,
          "avatarSource":null,
          "avatardisplay":null,
          "option1":"",
          "option2":"",
          "option3":""
        }
        this.sendDate = this.sendDate.bind(this);
        this.getEpoch = this.getEpoch.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        console.log(this.state.time)
    } 

    uploadImage = async () =>
    {
        launchImageLibrary({noData:true,mediaType:'photo',saveToPhotos:true}, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } 
        else 
        {
          this.setState({
            avatarSource:response.uri
        })
          //var dataURL =  canvas.toDataURL(this.state.avatarSource)
          //var data = Canvas.toDataURL(this.state.avatarSource)
        }
      }); 
    }
    getEpoch()
    {
      var d = new Date();
      var n = d.getTime();
      return n
    }

    sendDate()
    {
      var time = this.getEpoch()
      const form  = new FormData();
      form.append('file',{
        name:'image',
        uri: this.state.avatarSource
        
      })
{/*      form.append('data',
      {
        "Category":this.state.var_Category,
        "sub_category":this.state.var_sub_category,
        "is_timer":0,
        "Start_time":this.getEpoch,
        "End_time":this.getEpoch + 2 * 1000,
        "Poll_question":this.state.var_Poll_question,
        "Options":{
                "a":{
                        "option_name":"csk",
            "votes":0
                },
                "b":{
                        "option_name":"mi",
            "votes":0
                },
                "c":{
                        "option_name":"kkr",
            "votes":0
                }
        },
        "Attachment":"this.state.avatarSource",
        "Poll_status":0,
        "Is_anonymous":"yes",
        "Created_date":this.getEpoch,
        "Created_by":this.state.var_Created_by
}
      )
      console.log(form)
      console.log(form._parts[0][1])


      axios
            .post('http://192.168.1.7:5000/api/polls/createPoll', {                
          headers: {
              'accept': 'application/json',
              'Content-Type': `multipart/form-data`
          },
          'payload':form}
        */}
      axios
      .post('http://192.168.1.3:5000/api/polls/createPoll', 
        {
            "Category":this.state.var_Category,
            "sub_category":this.state.var_sub_category,
            "is_timer":0,
            "Start_time":this.getEpoch,
            "End_time":this.getEpoch + 2 * 1000,
            "Poll_question":this.state.var_Poll_question,
            "Options":{
                    "a":{
                            "option_name":this.state.option1,
                "votes":0
                    },
                    "b":{
                            "option_name":this.state.option2,
                "votes":0
                    },
                    "c":{
                            "option_name":this.state.option3,
                "votes":0
                    }
            },
            "Attachment":this.state.avatarSource,
            "Poll_status":0,
          //  "OptionItems":[this.state.option1,this.state.option2,this.state.option3],
            "Is_anonymous":"yes",
            "Created_date":time,
            "Created_by":this.state.var_Created_by
        }

            ).then( response => {
                console.log(response);
            })
            .then(error => {
              throw error;
            })
            
    }
    render(){
        return( 
          <ScrollView>    
            <View style = {styles.container}>
               <TextInput style = {styles.input}
                  ref="qn"
                  underlineColorAndroid = "transparent"
                  placeholder = "say something about your poll?"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {text => this.setState({"var_Poll_question": text})}     
                  />
                  
                <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = "category"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"   
                  onChangeText = {text => this.setState({"var_Category": text})}
                  />
                <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = "sub_category"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {text => this.setState({"var_sub_category": text})}
                  />       
                 <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = "hey what is your name?"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {text => this.setState({"var_Created_by": text})}
                  />                                         
                <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = "A Option"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"   
                  onChangeText = {text => this.setState({"option1": text})}
                  /
                  >
                <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = "B Option"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"   
                  onChangeText = {text => this.setState({"option2": text})}
                  /
                  >
                <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = "C Option"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"   
                  onChangeText = {text => this.setState({"option3": text})}
                  /
                  >
                {this.state.avatarSource && <Image source = {{uri: this.state.avatarSource}} style = {{width:100,height:200,resizeMode:'contain'}}/>}
               <Button title={"Upload a image"} onPress={this.uploadImage} />
               <Button title={"Create a new post"} onPress={this.sendDate} />
            </View>
            </ScrollView>    
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
  item:
  {
    fontSize:10,
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


module.exports = Createpoll