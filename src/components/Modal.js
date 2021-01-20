import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  FlatList
} from "react-native";
import firebase  from '../config';
import ProgressCircle from 'react-native-progress-circle'

const db= firebase.database();
let symptomData = db.ref('/dataset');
let diseaseData =db.ref('/datasetDisease')

export default class App extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: this.props.visible,
      disease:[],
      symptoms:[],
      sessionSymptom:this.props.Symptom,
    }
  }
 

  setModalVisible(visible){
    this.setState({ modalVisible: visible });
  }
  componentDidMount(){
    let dis=[];
    let symptoms=[];
    diseaseData.limitToFirst(1).on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        dis.push(childSnapshot.val().Disease);
        childSnapshot.val().Symptom.forEach((key)=>{ 
          symptoms.push({key:key})
        })
      });
    });
    
    this.setState({symptoms:symptoms})
    this.setState({disease:dis})
    console.log(symptoms)
  }
  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{this.state.disease}</Text>
              <FlatList
                data={this.state.symptoms}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                numColumns={2}
              />
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
          <TouchableHighlight style={styles.back} onPress={()=>this.setModalVisible(true)}>
              <View style={styles.DisEntry}>
                  <Text style={styles.text}>{this.state.disease}</Text>
                  <ProgressCircle
                      percent={30}
                      radius={50}
                      borderWidth={8}
                      color="#3399FF"
                      shadowColor="#999"
                      bgColor="#fff"
                  >
                  <Text style={{ fontSize: 18 }}>{'30%'}</Text>
              </ProgressCircle>
              </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
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
  DisEntry:{
    flexDirection:"row",
    backgroundColor:'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    width: 350,
  },
  item:{
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginRight:5,
    padding:2
  },
  text:{
    flex:1,
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

