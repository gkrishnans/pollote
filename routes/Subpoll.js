import { View, TextInput,StyleSheet,ScrollView,Text,Button} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import React, { Component } from 'react'; 
import 'react-native-gesture-handler';
//var ImagePicker = require('react-native-image-picker');

const axios = require('axios');
//var FormData = require('form-data');
 


Stack = createStackNavigator();


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
 
      module.exports = Subpoll      

