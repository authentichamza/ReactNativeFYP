import React,{ useState} from 'react';
import { StyleSheet, Text, Image, TextInput, View, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'


function Page1({navigation}) {
  const [Region, setRegion] = useState("Baluchistan");
  var regions = ['Baluchistan', 'Islamabad', 'Khyber Pakhtunkhwa', 'Punjab', 'Sindh'];
  const [City, setCity] = useState("Chaman");
  var cities1 = ["Chaman", "Hub", "Khuzdār", "Quetta", "Turbat"];
  var cities2 = ["Islamabad"];
  var cities3 = ["Peshawar", "Mardan", "Mingora", "Kohat", "Dera Ismail Khan", "Abbottabad", "Mansehra", "Swabi", "Nowshera", "Kabal", "Charsadda", "Barikot", "Shabqadar", "Haripur", "Takht-i-Bahi", "Paharpur", "Batkhela", "Jamrud", "Bahrain", "Lakki Marwat", "Pabbi", "Topi", "Jehangira", "Karak", "Bannu", "Chitral", "Hangu", "Havelian", "Khwazakhela", "Khalabat", "Tank", "Dir", "Matta", "Tordher", "Timargara", "Paroa", "Amangarh", "Risalpur", "Nawan Shehr", "Sadda", "Landi Kotal", "Tangi", "Akora Khattak", "Tall", "Zaida", "Utmanzai"];
  var cities4 = ['Lahore', 'Faisalabad', 'Rawalpindi', 'Gujranwala', 'Multan', 'Bahawalpur', 'Sargodha', 'Sialkot', 'Sheikhupura', 'Rahim Yar Khan', 'Jhang', 'Dera Ghazi Khan', 'Gujrat', 'Sahiwal', 'Wah Cantonment', 'Kasur', 'Okara', 'Chiniot', 'Kamoke', 'Hafizabad', 'Sadiqabad', 'Burewala', 'Khanewal', 'Muzaffargarh', 'Mandi Bahauddin', 'Jhelum', 'Khanpur', 'Pakpattan', 'Daska', 'Gojra', 'Muridke', 'Bahawalnagar', 'Samundri', 'Jaranwala', 'Chishtian', 'Attock', 'Vehari', 'Kot Abdul Malik', 'Ferozewala', 'Chakwal', 'Gujranwala Cantonment', 'Kamalia', 'Ahmedpur East', 'Kot Addu', 'Wazirabad', 'Layyah', 'Taxila', 'Khushab', 'Mianwali', 'Lodhran', 'Hasilpur', 'Bhakkar', 'Arif Wala', 'Sambrial', 'Jatoi', 'Haroonabad', 'Narowal', 'Bhalwal'];
  var cities5 = ['Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Nawabshah', 'Kotri', 'Mirpur Khas', 'Shikarpur', 'Jacobabad', 'Khairpur', 'Dadu', 'Tando Allahyar', 'Tando Adam Khan', 'Umerkot', 'Shahdadkot', 'Badin', 'Ghotki', 'Daharki', 'Tando Muhammad Khan', 'Kamber Ali Khan', 'Mirpur Mathelo', 'Kandhkot', 'Shahdadpur', 'Moro', 'Tando Jam', 'Pano Akil', 'Sanghar', 'Thul', 'Rohri', 'Ratodero', 'Sehwan Sharif', 'Hala', 'Sakrand', 'Matli', 'Kashmore', 'Mehar', 'Thatta', 'Mehrabpur', 'Gambat', 'Khipro'];
  const CitySelector = () => {
      if (Region === 'Punjab') {
          return <Picker
              style={{ height: 20, width: 150 }}
              mode="dropdown"
              selectedValue={City}
              onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
              {cities4.map((City) => {
                  return (<Picker.Item label={City} value={City} />);
              })}
          </Picker>;
      }
      if (Region === 'Sindh') {
          return <Picker
              style={{ height: 20, width: 150 }}
              mode="dropdown"
              selectedValue={Region}
              onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
              {cities5.map((City) => {
                  return (<Picker.Item label={City} value={City}/>);
              })}
          </Picker>;
      }
      if (Region === 'Baluchistan') {
          return <Picker
              style={{ height: 20, width: 150 }}
              mode="dropdown"
              selectedValue={Region}
              onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
              {cities1.map((City) => {
                  return (<Picker.Item label={City} value={City}/>);
              })}
          </Picker>;
      }
      if (Region === 'Islamabad') {
          return <Picker
              style={{ height: 20, width: 150 }}
              mode="dropdown"
              selectedValue={Region}
              onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
              {cities2.map((City) => {
                  return (<Picker.Item label={City} value={City}/>);
              })}
          </Picker>;
      }
      if (Region === 'Khyber Pakhtunkhwa') {
          return <Picker
              style={{ height: 20, width: 150 }}
              mode="dropdown"
              selectedValue={Region}
              onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
              {cities3.map((City) => {
                  return (<Picker.Item label={City} value={City}/>);
              })}
          </Picker>;
      }
  };

  return (
      <View style={styles.container}>
          <View style={styles.above}>
              <Image
                  style={{ width: 75, height: 75 }}
                  source={require('./assets/medkit.png')} />
          </View>
          <View style={styles.below}>
              <View style={styles.line}>
                  <Text style={styles.text}>Enter name:</Text>
                  <TextInput
                      style={styles.input}
                      placeholder='e.g. John Doe' />
              </View>
              <View style={styles.line}>
                  <Text style={styles.text}>Enter Age:</Text>
                  <TextInput
                      keyboardType='numeric'
                      style={styles.input}
                      placeholder='24' />
              </View>
              <View style={styles.line}>
                  <Text style={styles.text}>Enter Region:</Text>
                  <Picker
                      style={{ height: 20, width: 150 }}
                      mode="dropdown"
                      selectedValue={Region}
                      onValueChange={(itemValue, itemIndex) => setRegion(itemValue)}>
                      {regions.map((Region, index) => {
                          return (<Picker.Item label={Region} value={Region} key={index} />);
                      })}
                  </Picker>
              </View>
              <View style={styles.line}>
                  <Text style={styles.text}>Enter City:</Text>
                  {CitySelector()}
              </View>
              <View style={styles.btn}>
              <Button
                  title="Go to Details"
                  onPress={() => navigation.navigate('Page2')}
              />    
              </View>        
          </View>
          </View>
  );
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
      marginTop:100

    }
    
  }
  )
export default Page1;