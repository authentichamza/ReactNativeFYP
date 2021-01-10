import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  ToastAndroid
} from 'react-native';
import AutoTags from 'react-native-tag-autocomplete';
const mainColor = '#3ca897';
import firebase  from '../config';
const db= firebase.database();
let itemsRef = db.ref('/dataset');
let input = db.ref('/tags');
let addItem = item => {
  input.push({
    userSymptom: item
  });
};

export default class App extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      tags: {
        tag: '',
        tagsArray: []
      },
      tagsSelected:[],
      tagsColor: mainColor,
      tagsText: '#fff',
      storedTags:[]
    };
  }
  componentDidMount(){
    let storedTags=[];
    itemsRef.on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        storedTags.push({'name':childSnapshot.val().Symptom});
        });
      });
    this.setState({ storedTags: storedTags})
  }

  handleSubmit = () => {
    addItem(this.state.tags.tagsArray);
    ToastAndroid.show('Symptoms saved successfully', ToastAndroid.SHORT)
  };

  updateTagState = (state) => {
      this.setState({
        tags: state
      })
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
        {/* <TagInput
          updateState={this.updateTagState}
          tags={this.state.tags}
          placeholder="Tags..."                            
          label='Press space to add a tag'
          labelStyle={{color: '#fff'}}
          leftElementContainerStyle={{marginLeft: 3}}
          containerStyle={{width: (Dimensions.get('window').width - 40)}}
          inputContainerStyle={[styles.textInput, {backgroundColor: this.state.tagsColor}]}
          inputStyle={{color: this.state.tagsText}}
          onFocus={() => this.setState({tagsColor: '#fff', tagsText: mainColor})}
          onBlur={() => this.setState({tagsColor: mainColor, tagsText: '#fff'})}
          autoCorrect={false}
          tagStyle={styles.tag}
          tagTextStyle={styles.tagText}
          keysForTag={', '}
          customElement={this.state.storedTags}
          /> */}
          <View style={styles.autocompleteContainer}>
            <AutoTags
                suggestions={this.state.storedTags}
                tagsSelected={this.state.tagsSelected}
                handleAddition={this.handleAddition}
                handleDelete={this.handleDelete}
                placeholder="Add a Symptom.." />
          </View>
          <TouchableHighlight
            style={styles.button}
            underlayColor="blue"
            onPress={this.handleSubmit}>
              <Text style={styles.buttonText}>Add</Text>
          </TouchableHighlight>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: mainColor,
  },
  textInput: {
      height: 40,
      borderColor: 'white',
      borderWidth: 1,
      marginTop: 8,
      borderRadius: 5,
      padding: 3,
    },
  button:{
      justifyContent:'center',

  },
    autocompleteContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom:10
      }
});