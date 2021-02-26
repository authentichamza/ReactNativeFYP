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
import ProgressCircle from 'react-native-progress-circle'


export default class App extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: this.props.visible,// Modal visible variable received from page 3
      result:[],
      symptoms:[],
      match:'',
      mismatch:'',
      dis:'',
      
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
  fetchSymptoms(dis){
    this.setState({match:Object.values(dis['degree'])[0]})
    this.setState({mismatch: Object.values(dis[Object.keys(dis)[0]]).filter(x => !Object.values(dis['degree'])[0].includes(x))})
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
                    
                      data={this.state.match}
                      renderItem={({item}) => <Text style={styles.itemMatch}>{item}</Text>}
                      numColumns={2} // 2 symptoms per row
                    />
                    <FlatList
                   
                      data={this.state.mismatch}
                      renderItem={({item}) => <Text style={styles.itemMismatch}>{item}</Text>}
                      numColumns={1} // 2 symptoms per row
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
            return(
          <View style={styles.container}> 
            <TouchableHighlight style={styles.back} 
            onPress={()=>{this.setModalVisible(true);this.change(Object.keys(dis)[0]);this.fetchSymptoms(dis);
            }}>  
                <View style={styles.DisEntry}>
                    <Text style={styles.text}>{Object.keys(dis)[0]}</Text>
                    <ProgressCircle
                        percent={dis['degree'][1]}
                        radius={50}
                        borderWidth={8}
                        color="#3399FF"
                        shadowColor="#999"
                        bgColor="#fff"
                    >
                    <Text style={{ fontSize: 18 }}>{dis['degree'][1]+'%'}</Text>
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
    flex:1,
    flexDirection:"row",
    backgroundColor:'#00abb1',
    borderColor: '#00abb1',
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    marginBottom:10,
    justifyContent: 'center', //Centered vertically
   alignItems: 'center',
    
  },
  itemMatch:{
    borderColor: '#00abb1',
    borderWidth: 1,
    borderRadius: 5,
    marginRight:5,
    padding:2,
    backgroundColor:'#32a842',
    color:'white'
  },
  itemMismatch:{
    borderColor: '#00abb1',
    borderWidth: 1,
    borderRadius: 5,
    marginRight:5,
    padding:2,
    backgroundColor:'#ff0000',
    color:'white'
  },
  text:{
    flex:1,
    color:'white',
    fontSize:20,
    textAlign:"center",
    
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

