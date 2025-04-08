import './gesture-handler';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import QuestsDisplay from './src/screens/QuestsDisplay';
import QuestModal from './src/screens/QuestModal';
import QuestCreatorModal from './src/screens/QuestCreatorModal';
import {RootStackParams} from './src/global/types.ts';

export default function App() {
  const Stack = createStackNavigator<RootStackParams>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Display"
          component={QuestsDisplay}
          options={{headerShown: false, animation: 'none'}}
        />
        <Stack.Screen
          name="Modal"
          component={QuestModal}
          options={{headerShown: false, presentation: 'transparentModal'}}
        />

        <Stack.Screen
          name="Creator"
          component={QuestCreatorModal}
          options={{headerShown: false, presentation: 'transparentModal'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
