import React from 'react';
import { Text, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import RegisterFormScreen from './screens/RegisterFormScreen';

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={({navigation}) => ({ 
            title: 'Registers App',
            headerStyle: { backgroundColor: '#222f3e' }, 
            headerTitleStyle: { color: '#ffffff' },
            headerRight: () => (
                <TouchableOpacity 
                  onPress={() => navigation.navigate('RegisterFormScreen') }
                >
                  <Text style={{color: '#ffffff', marginRight: 20, fontSize: 15}}>NEW</Text>
                </TouchableOpacity>
            )
          })} 
        />
        <Stack.Screen name="RegisterFormScreen" component={RegisterFormScreen} 
          options={{
            title: 'Create a Register',
            headerStyle: {
              backgroundColor: "#222f3e",
            },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: '#ffffff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App