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
import { color } from "react-native-reanimated";

const db= firebase.firestore();
let diseaseData =db.collection('datasetDisease')// storing connection of datasetDisease into diseaseData var
let symptoms=[];
// diseaseData.get().then(querySnapshot => {
//   querySnapshot.forEach((doc) => {
//     doc.data() //is never undefined for query doc snapshots
//     console.log(doc.data().Symptom);
// });
// });
export default class App extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: this.props.visible,// Modal visible variable received from page 3
      result:[],
      symptoms:[],
      item:'______',
      dis:'',
      sessionSymptom:[],
    }
  }
  changeDis(dis){
    this.setState({result:dis})

  }
  setEnteredSymptoms(sym){
    this.setState({symptoms:sym})
  }
  setModalVisible(visible){// changing visibility method 
    this.setState({ modalVisible: visible });
  }
  change(dis){
    this.setState({dis:dis});
  }
  
  render() {
    return (
      <View>
            <View style={styles.centeredView}>
            <Modal //Modal with disease Name and flat list of specific disease symptoms
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                console.log("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{this.state.dis}</Text>
                  <FlatList
                    data={this.state.symptoms}
                    renderItem={({item}) => <Text style={styles.item}>{this.state.item}</Text>}
                    numColumns={2} // 2 symptoms per row
                  />
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
          
          {this.state.result.map((dis)=>{
            let x=this.setEnteredSymptoms(this.state.symptoms,Object.values(dis))
            return(
          <View style={styles.container}> 
            <TouchableHighlight style={styles.back} 
            onPress={()=>{this.setModalVisible(true);this.change(dis);this.fetchSymptoms(dis);
            }}>  
                <View style={styles.DisEntry}>
                    <Text style={styles.text}>{Object.keys(dis)}</Text>
                    <ProgressCircle
                        percent={30}
                        radius={50}
                        borderWidth={8}
                        color="#3399FF"
                        shadowColor="#999"
                        bgColor="#fff"
                    >
                    <Text style={{ fontSize: 18 }}>{x}</Text>
                  </ProgressCircle>
                </View>
            </TouchableHighlight>
          </View>
          )})}
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
    backgroundColor:'#00abb1',
    borderColor: '#00abb1',
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    width: 350,
  },
  item:{
    borderColor: '#00abb1',
    borderWidth: 1,
    borderRadius: 5,
    marginRight:5,
    padding:2,
    backgroundColor:'#00abb1',
    color:'white'
  },
  text:{
    flex:1,
    color:'white'
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
    textAlign: "center",
    color:'white',
    fontSize:20,
    marginBottom:50,
    borderRadius: 20,
    backgroundColor:'#00abb1',
    paddingHorizontal:20
  }
});

