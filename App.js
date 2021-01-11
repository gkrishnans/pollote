
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { View, TextInput,Image ,ScrollView,Text,Button,StyleSheet,TouchableOpacity} from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Canvas from 'react-native-canvas';
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

class Subpoll extends Component 
{
    constructor()
    {
      super();
      this.state = {
        "pagenumber":'1',
        "subcaterogy":"",
        "listViews":[],
        "encodedBase64": '',
        "response":{"data":{"data":{0:''}}}

      }
      this.sendDate = this.sendDate.bind(this)
      this.votePoll = this.votePoll.bind(this)
    }
    sendDate()
    {
        axios//192.168.1.3
            .get('http://192.168.1.3:5000/api/polls/getPollDetails/subcategory',{
              params: {
                "page":this.state.pagenumber,
                "subcategory":this.state.subcategory,
              }
            }          
            ).then( response => {
              this.setState({"response":response})
              this.setState({"listViews":this.state.response.data['data']})

              console.log(this.state.response.data['data'])

            })
        //console.log(this.state.response.data['data'][0]['Created_by'])//this.state.response.data.data[0].Category)
        //Poll_question
        //<Text style ={item}>{item.Poll_question} is {item.Poll_id} old </Text>

    }
    votePoll(id,voter,option)
    {
      axios
      .post('http://192.168.1.3:5000/api/polls/votePoll',
      {
              "Poll_id":id,
              "username":voter,
              "Options":option,
              "Is_anonymous":"yes" 
      }            
      ).then( response => {
          console.log(response);
      })
    }

    render(){
        return( 
            <View style = {styles.container}>
              <ScrollView>    
                {
                  this.state.listViews.map(item => (
                    <View style={styles.apoll}>
                      <Text style ={styles.item}>{item.Poll_question} </Text>
                    
                      <View style = {{ flexDirection: "row" ,marginLeft: 20, justifyContent: 'space-evenly' }}>
                      <Button style={styles.button} title={item.Options.a.option_name} onPress={this.votePoll(item.Poll_id,"gokul","a")} />
                      <Button style={styles.button} title={item.Options.b.option_name} onPress={this.votePoll(item.Poll_id,"gokul","b")} />
                      <Button style={styles.button} title={item.Options.c.option_name} onPress={this.votePoll(item.Poll_id,"gokul","c")} />
                      </View>
                    </View>
                  ))
                }      
                
              </ScrollView>
                                 
                <TextInput style = {styles.input}
                 underlineColorAndroid = "transparent"
                  placeholder = "Mention the sub cateorgy"  
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {text => this.setState({"subcategory": text})}
                  />                                         
               <Button title={"get polls"} onPress={this.sendDate} />
            </View>  
        );
        }
}

{/*
class Votepoll extends Component 
{
    constructor()
    {
      super();
      this.state = {
        "Poll_id":0,
        "username":"",
        "Options":"",,M NBVCX
      };
      this.sendDate = this.sendDate.bind(this);
    }

    sendDate()
    {
        axios
            .post('http://192.168.1.7:5000/api/polls/votePoll',
            {
                    "Poll_id":this.state.Poll_id,
                    "username":this.state.username,
                    "Options":this.state.Options,
                    "Is_anonymous":"yes" 
            }            
            ).then( response => {
                console.log(response);
            })
    }
    render(){
        return( 
            <View style = {container}>
                <TextInput style = {inputs}
                  underlineColorAndroid = "transparent"
                  placeholder = "opt"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {text => this.setState({"Options": text})}
                  />                                         
                <TextInput style = {inputs}
                  underlineColorAndroid = "transparent"
                  placeholder = "poll id you are voting"  
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {text => this.setState({"Poll_id": text})}
                  />                                         
               <Button title={"Vote"} style = {inputs} onPress={this.sendDate} />            
              </View>  
        );
    }
}
*/}



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
      <Stack.Screen name= "signup"  component={SignupPage} options={{ title: 'polloteSignup' }}/>
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

   logo: {
    width: 66,
    height: 58,
  },
  item:
  {
    fontSize:10,
  },
  apoll:
  {
    marginTop:10,
    padding:30,
    backgroundColor:'#ADD8E6',
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
