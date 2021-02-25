import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  ToastAndroid
} from 'react-native';
import AutoTags from 'react-native-tag-autocomplete';
import firebase  from '../config';
const db= firebase.firestore();// connect with firestore of firebase 
let itemsRef = db.collection('datasetSymptom');// store datasetSymptom collection into itemref
let input = db.collection('userSymptoms');// store userSymptoms collection into itemref
let addItem = item => {//Add into userSymptom with firestore generated unique id document
  input.doc().set({// as doc name not mentioned
    userSymptom: item
  });
  
};

export default class App extends React.Component {
  
constructor(props) {
    super(props);
    this.state = {
      tagsSelected:[],
      storedTags:[]
    };
  }
  componentDidMount(){
    let storedTags=[];
    itemsRef.get().then(querySnapshot => {// fetching dataset Symptom collection all documents using snapshot
      querySnapshot.docs.forEach(doc => {storedTags.push({'name':doc.id});});//on each and storing it in 'name' key : symptom name form as aked by  autotags component
    });
    this.setState({ storedTags: storedTags})
    
  }

  handleSubmit = () => {
    addItem(this.state.tagsSelected);
    ToastAndroid.show('Symptoms saved successfully', ToastAndroid.SHORT)
  };

  handleDelete = index => {
      let tagsSelected = this.state.tagsSelected;
      tagsSelected.splice(index, 1);
      this.setState({ tagsSelected });
   }
   
  handleAddition = suggestion => {
      this.setState({ tagsSelected: this.state.tagsSelected.concat([suggestion]) });
   }
  
  render() {
    
    return (
      <View style={styles.container}>
          <View style={styles.autocompleteContainer}>
            <AutoTags  // Text adding component with auto completion feature and bubble feature
                suggestions={this.state.storedTags}
                tagsSelected={this.state.tagsSelected}
                handleAddition={this.handleAddition}
                handleDelete={this.handleDelete}
                placeholder="Add a Symptom.." />
          </View>
          <TouchableHighlight //  wrapper for making views respond properly to touches
            style={styles.button}
            underlayColor="blue"
            onPress={() => {this.props.navigation.navigate('Diagnosis',{// props sent to page 3 using navingation component.
              selected:this.state.tagsSelected,
              stored:this.state.storedTags,
            }); this.handleSubmit(); }}>
              <Text style={styles.buttonText}>Search</Text>
          </TouchableHighlight>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'white'
  },
  textInput: {
      height: 60,
      borderColor: 'white',
      borderWidth: 1,
      marginTop: 8,
      borderRadius: 5,
      padding: 3,
    },
  button:{
      justifyContent:'center',
      backgroundColor: "#00abb1",
      height: 50,
      width:100,
      textAlign:'center',
      alignItems:'center'

  },
  buttonText:{
    color:'white',
    fontSize:20
  },
  
    autocompleteContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom:10
      }
});
