
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { View, TextInput,Image ,ScrollView,Text,Button,StyleSheet} from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Canvas from 'react-native-canvas';

import React, { Component } from 'react'; 
import 'react-native-gesture-handler';
//var ImagePicker = require('react-native-image-picker');

const axios = require('axios');

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
          "avatarbase64":null
        }
        this.sendDate = this.sendDate.bind(this);
        this.getEpoch = this.getEpoch.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        console.log(this.state.time)
    } 


    uploadImage = async () =>
    {
        launchImageLibrary({noData:true,mediaType:'photo',includeBase64:true}, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
            this.setState({
            "avatarSource": response.uri,
            "avatarbase64": response.base64
          });
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
        axios
            .post('http://192.168.1.7:5000/api/polls/createPoll',
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
                    "Attachment":this.state.avatarbase64,
                    "Poll_status":0,
                    "Is_anonymous":"yes",
                    "Created_date":this.getEpoch,
                    "Created_by":this.state.var_Created_by
            }
            ).then( response => {
                console.log(response);
            })
    }
    render(){
        return( 
            <View style = {styles.container}>
               <TextInput style = {styles.input}
                  ref="qn"
                  underlineColorAndroid = "transparent"
                  placeholder = "say something about your poll?"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  value = {this.state.qn}
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


                {this.state.avatarSource && <Image source = {{uri: this.state.avatarSource}} style = {{width:100,height:200,resizeMode:'contain'}}/>}
               <Button title={"Upload a image"} onPress={this.uploadImage} />
               <Button title={"Create a new post"} onPress={this.sendDate} />
            </View>  
        );
        }
}

class Subpoll extends Component 
{
    constructor()
    {
      super();
      this.state = {
        "pagenumber":"",
        "subcaterogy":"",
        "listViews":[{name:'gokul',age:'20'},{name:'siva',age:'22'},{name:'siva',age:'22'},{name:'siva',age:'22'},{name:'siva',age:'22'},{name:'siva',age:'22'},{name:'siva',age:'22'},{name:'siva',age:'22'}],
        "encodedBase64": 'data:image/png;base64,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',
        "response":{"data":{"data":{0:'data:image/png;base64,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'}}}

      }
      this.sendDate = this.sendDate.bind(this)
      this.votePoll = this.votePoll.bind(this)
    }
    sendDate()
    {
        axios
            .get('http://192.168.1.7:5000/api/polls/getPollDetails/subcategory',{
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
      .post('http://192.168.1.7:5000/api/polls/votePoll',
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
                    <View style = {styles.apoll}>
                    <Text style ={item}>{item.Poll_question} has id number {item.Poll_id}  </Text>
                    <Button title={"Vote"} onPress={this.votePoll(item.Poll_id,"neelam","c")} />
                    </View>
                  ))
                }      
              </ScrollView>
                <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = "Enter the number of pages to be viewed"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {text => this.setState({"pagenumber": text})}
                  />                                         
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
        "Options":"",
        "Is_anonymous":"yes"         
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

function navigatorsignin({navigation})
{
  return(
    ()=> {navigation.navigate("signin")}
  )
}

function navigatorsignup({navigation})
{
  return(
    ()=> {navigation.navigate("signup")}
  )
}


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
        axios     
            .post('http://192.168.1.7:6000/api/signup',
            {
                    "username":this.state.username,
                    "password":this.state.password,
                    "email":this.state.email,
            }            
            ).then( response => {
                console.log(response);
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

    }    
    
    signinSubmit()
    {
        axios     
            .post('http://192.168.1.7:6000/api/signin',
            {
                    "username":this.state.username,
                    "password":this.state.password,
            }            
            ).then( response => {
                console.log(response);
                this.navigater("home")
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

export default function App() {
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
  }

  })
