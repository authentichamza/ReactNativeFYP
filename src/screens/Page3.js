import React, { Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  ToastAndroid,
  ScrollView,
  ActivityIndicator

} from 'react-native';
import AutoTags from 'react-native-tag-autocomplete';
import firebase  from '../config';
import { TabView, SceneMap } from 'react-native-tab-view';
import DiseaseComponent from '../components/DiseaseComponent';
var data;
const db= firebase.firestore();//for firestore connection from firebase
let input = db.collection('userSymptoms');
let symptomsRef=db.collection('datasetDisease')

let addItem = item => {//Add into userSymptom with firestore generated unique id document
  input.doc().set({
    userSymptom: item
  });
  
};


export default class App extends React.Component {
constructor(props) {
    super(props);
    this.modalElement = React.createRef();
    this.state = {
      tagsSelected:this.props.route.params.selected,//selected tags stored from page 2
      storedTags:this.props.route.params.stored,//stored tags stored from page 2
      result:['HIV','Flu'],
      data1:[],
      index: 0,
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'Third'}],
      modalVisible: false,
    };
  }
  
  async componentDidMount(){
    let select=[];
    let tagsSelected=this.state.tagsSelected
    tagsSelected.forEach(element => {
      select.push(element.name)
    });
    
    await symptomsRef.where("Symptom", "array-contains-any", select).get().then((querySnapshot) => {
      data=querySnapshot.docs.map((doc) => (doc.id));
      console.log("in", data);
      // Users with > 1 book:  [ { id: 'user-1', count: 1 } ]
    });
    // console.log("out",this.state.result)
      this.onResultChange(data)
      this.modalElement.current.changeDis(this.state.result)
     console.log("out",this.state.result)
     
    // console.log("out",result)

  }
  onResultChange(data){
    this.setState({result:data})
  }
  FirstRoute = () => (// What to show in the first tab 
    //Modal with props to be sent to Modal component so that visiblity can be adjusted iinside a scroll view

    <ScrollView style={[styles.container, { backgroundColor: 'white' }]} >
      
    <DiseaseComponent ref={this.modalElement} visible={this.state.modalVisible} Symptom={this.state.tagsSelected} />
    </ScrollView>
  );
  SecondRoute = () => (// What to show in the second tab
    <View style={[styles.container, { backgroundColor: '#673ab7' }]}>

    </View>
  );
  ThirdRoute = () => (// What to show in the third tab
    <View style={[styles.container, { backgroundColor: '#673ab7' }]}>
    
    </View>
  );
  handleSubmit = () => {// submit symptoms
    addItem(this.state.tagsSelected);
    ToastAndroid.show('Symptoms saved successfully', ToastAndroid.SHORT)// 
  };

  handleDelete = index => {// to delete a tag
      let tagsSelected = this.state.tagsSelected;
      tagsSelected.splice(index, 1);
      this.setState({ tagsSelected });
   }
   
  handleAddition = suggestion => {// add bubble symptom
      this.setState({ tagsSelected: this.state.tagsSelected.concat([suggestion]) });
   }
   _handleIndexChange = index => this.setState({ index });// receives the index of the new tab as argument
   _renderScene=SceneMap({
     first:this.FirstRoute,
     second:this.SecondRoute,
     third:this.ThirdRoute
   })
 
   
  render() {
    
    // if (!this.state.result) {
    //   return (
    //     <ActivityIndicator
    //       animating={true}
    //       style={styles.indicator}
    //       size="large"
    //     />
    //   );
    // } 
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.autocompleteContainer}>
                    <AutoTags // Text adding component with auto completion feature and bubble feature
                        suggestions={this.state.storedTags}
                        tagsSelected={this.state.tagsSelected}
                        handleAddition={this.handleAddition}
                        handleDelete={this.handleDelete}
                        placeholder="Add a Symptom.." />
                </View>
                <TouchableHighlight //  wrapper for making views respond properly to touches
                    style={styles.button}
                    underlayColor="blue"
                    onPress={this.handleSubmit}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableHighlight>
            </View>
            <View>
              <Text>{this.state.result}</Text>
            </View>
            <TabView // Tabbed View component
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
    backgroundColor:'white'
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
    backgroundColor:'#00abb1',
    borderColor: '#00abb1',
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    justifyContent:'flex-end',
    marginBottom:10,
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
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }

});
