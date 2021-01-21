import React, { Component,useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  ToastAndroid,
  ScrollView,
  

} from 'react-native';
import AutoTags from 'react-native-tag-autocomplete';
import firebase  from '../config';
import { TabView, SceneMap } from 'react-native-tab-view';
import Modal from '../components/Modal';

const db= firebase.database();
let itemsRef = db.ref('/dataset');
let input = db.ref('/tags');

let addItem = item => {
  input.push({
    userSymptom: item
  });
};
let storedTags=[];
    itemsRef.on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        storedTags.push({'name':childSnapshot.val().Symptom});
        });
      });
let userSymptoms=[];
input.limitToLast(1).on('value', (snapshot)=>{
    snapshot.forEach((childSnapshot)=>{
      childSnapshot.val().userSymptom.forEach(element=>{
          userSymptoms.push(element)
      })
    })
  })
export default class App extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      tagsSelected:userSymptoms,
      storedTags:storedTags,
      index: 0,
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'Third'}],
      modalVisible: false,
    };
  }
  
  componentDidMount(){
    
    // this.setState({ tagsSelected:userSymptoms})
    // this.setState({ storedTags: storedTags})
  }
  
  FirstRoute = () => (
    <ScrollView style={[styles.container, { backgroundColor: '#ff4081' }]} >
    <Modal visible={this.state.modalVisible} Symptom={this.state.tagsSelected} />
    </ScrollView>
  );
  SecondRoute = () => (
    <View style={[styles.container, { backgroundColor: '#673ab7' }]}>

    </View>
  );
  ThirdRoute = () => (
    <View style={[styles.container, { backgroundColor: '#673ab7' }]}>
    
    </View>
  );
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
   _handleIndexChange = index => this.setState({ index });

 
   _renderScene = SceneMap({
    first: this.FirstRoute,
    second: this.SecondRoute,
    third: this.ThirdRoute,
  });
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
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
            <TabView
                style={styles.tab}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderTabBar={this._renderTabBar}
                onIndexChange={this._handleIndexChange}
            />
            
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  row:{
    flexDirection:"row"
  },
  
  back:{
    backgroundColor: 'blue'
  },
  text:{
    flex:1,
  },
  button:{
    flex:0,
    backgroundColor:'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    justifyContent:'flex-end',
    height:30,
    justifyContent:'center',

  },
  autocompleteContainer: {
    flex:1,
    justifyContent:'flex-start',
    marginBottom:10
  },
  tab:{
    flex:1,

  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});