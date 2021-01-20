import React,{ useState} from 'react';
import { StyleSheet, Text, Image, TextInput, View, Button,ToastAndroid} from 'react-native';
import { Picker } from '@react-native-picker/picker'
import  firebase from '../config';
const db=firebase.database();
let input = db.ref('/tags');
let cities=db.ref('/cities')
let addItem=([item,item2,item3,item4]) => {
  input.push({
    name:item,
    age:item2,
    Region:item3,
    City:item4,
  });
  ToastAndroid.show('Details saved successfully', ToastAndroid.SHORT)
};
var regions = ['Baluchistan', 'Islamabad', 'Khyber Pakhtunkhwa', 'Punjab', 'Sindh'];
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Region:'',
            name:'',
            age:'',
            City:'',
            cities1:[],
            cities2:[],
            cities3:[],
            cities4:[],
            cities5:[],
        }
    }
    componentDidMount(){
        
        cities.on('value', (snapshot) => {
            snapshot.val().cities1.forEach(element => {
                this.state.cities1.push(element);
            });
            snapshot.val().cities2.forEach(element => {
                this.state.cities2.push(element);
            });
            snapshot.val().cities3.forEach(element => {
                this.state.cities3.push(element);
            });
            snapshot.val().cities4.forEach(element => {
                this.state.cities4.push(element);
            });
            snapshot.val().cities5.forEach(element => {
                this.state.cities5.push(element);
            });
          });
        
      }
    CitySelector(){
        if (this.state.Region === 'Punjab') {
            return <Picker
                style={{ height: 20, width: 150 }}
                mode="dropdown"
                selectedValue={this.state.City}
                onValueChange={(City)=>this.setState({City:City})}>
                {this.state.cities4.map((City) => {
                    return (<Picker.Item label={City} value={City} />);
                })}
            </Picker>;
        }
        if (this.state.Region === 'Sindh') {
            return(<Picker
                style={{ height: 20, width: 150 }}
                mode="dropdown"
                selectedValue={this.state.Region}
                onValueChange={(City)=>this.setState({City:City})}>
                {this.state.cities5.map((City) => {
                    return (<Picker.Item label={City} value={City}/>);
                })}
            </Picker>);
        }
        if (this.state.Region === 'Baluchistan') {
            return(<Picker
                style={{ height: 20, width: 150 }}
                mode="dropdown"
                selectedValue={this.state.City}
                onValueChange={(City)=>this.setState({City:City})}>
                {this.state.cities1.map((City) => {
                    return (<Picker.Item label={City} value={City}/>);
                })}
            </Picker>);
        }
        if (this.state.Region === 'Islamabad') {
            return( <Picker
                style={{ height: 20, width: 150 }}
                mode="dropdown"
                selectedValue={this.state.City}
                onValueChange={(City)=>this.setState({City:City})}>
                {this.state.cities2.map((City) => {
                    return (<Picker.Item label={City} value={City}/>);
                })}
            </Picker>);
        }
        if (this.state.Region === 'Khyber Pakhtunkhwa') {
            return (<Picker
                style={{ height: 20, width: 150 }}
                mode="dropdown"
                selectedValue={this.state.City}
                onValueChange={(City)=>this.setState({City:City})}>
                {this.state.cities3.map((City) => {
                    return (<Picker.Item label={City} value={City}/>);
                })}
            </Picker>);
        }
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.above}>
                    <Image
                        style={{ width: 75, height: 75 }}
                        source={require('../../assets/medkit.png')} />
                </View>
                <View style={styles.below}>
                    <View style={styles.line}>
                        <Text style={styles.text}>Enter name:</Text>
                        <TextInput
                            onChangeText={(name)=>this.setState({name:name})}
                            style={styles.input}
                            placeholder='e.g. John Doe' />
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.text}>Enter Age:</Text>
                        <TextInput
                            onChangeText={(age)=>this.setState({age:age})}
                            keyboardType='numeric'
                            style={styles.input}
                            placeholder='24' />
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.text}>Enter Region:</Text>
                        <Picker
                            style={{ height: 20, width: 150 }}
                            mode="dropdown"
                            selectedValue={this.state.Region}
                            onValueChange={(Region)=>this.setState({Region:Region})}>
                            {
                                regions.map((Region, index) => {
                                return (<Picker.Item label={Region} value={Region} key={index} />);
                            })
                            }
                        </Picker>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.text}>Enter City:</Text>
                        {this.CitySelector()}
                    </View>
                    <View style={styles.line}>
                    <Button
                        title="Add"
                        onPress={() => addItem([this.state.name,this.state.age,this.state.Region,this.state.City])}
                    />    
                    </View>
                    <View style={styles.btn}>
                    <Button
                        title="Go to Details"
                        onPress={() => this.props.navigation.navigate('Page2')}
                    />    
                    </View>        
                </View>
                </View>
            );
        };
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flexDirection:'column',
      flex:0,
      
    },
    
    line:{
      flexDirection:'row',
      flex:0,
      marginBottom:10,
    },
    text:{
      flex:1,
    },
    input:{
      flex:1,
      width:70,
      height:20,
      borderBottomWidth:1,
      borderBottomColor:'#777',
    },
    above:{
      flex:0,
      alignItems:'center',
      justifyContent:'center',
      marginTop:50,
      marginBottom:100,
    },
    below:{
      flex:0,
      alignItems:'center',
      justifyContent:'center',
    },
    
    btn:{
      marginTop:50

    }
    
  }
  );
