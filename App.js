import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet} from 'react-native';
// import Page1 from './src/screens/Page1';
import Page2 from './src/screens/Page2';
import Page3 from './src/screens/Page3';
import DiseaseComponent from './src/components/DiseaseComponent';


const Stack = createStackNavigator();// a way to trasition between screens each screen is placed as stack of books of top of each other

function App() {
  return (// Navigation container with stack order
    <NavigationContainer>
      <Stack.Navigator> 
        {/* <Stack.Screen name="Page1" component={Page1} /> */}
        <Stack.Screen name="Symptom" component={Page2} />
        <Stack.Screen name='Diagnosis' component={Page3} />
        <Stack.Screen name='Modal' component={DiseaseComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({}
)
export default App;