import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../global/types';
import {TextInput} from 'react-native-gesture-handler';

export default function QuestModal() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.modalBackground} onPress={navigateBack} />
      <View style={styles.modal}>
        <Text>Quest</Text>
      </View>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    zIndex: 0,
  },
  modal: {
    height: screenHeight - 200,
    width: screenWidth - 40,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
});
