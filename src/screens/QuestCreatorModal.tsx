import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  CommonActions,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {QuestType, RootStackParams} from '../global/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function QuestCreatorModal({route}: any) {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const [questName, setQuestName] = useState('');
  const [questPriority, setQuestPriority] = useState('');
  const [questDescription, setQuestDescription] = useState('');
  const [questType, setQuestType] = useState('');

  const [questUnits, setQuestUnits] = useState('');

  const questPriorityRadio = useMemo(
    () => [
      {
        id: '1',
        label: 'Main quest',
        value: 'main',
      },
      {
        id: '2',
        label: 'Side quest',
        value: 'side',
      },
    ],
    [],
  );

  const questProgression = useMemo(
    () => [
      {
        id: '1',
        label: 'Progressive (Add progression over the day)',
        value: 'numerical',
      },
      {
        id: '2',
        label: 'Singular (Complete once during day)',
        value: 'boolean',
      },
    ],
    [],
  );

  const questUnitRadio = useMemo(
    () => [
      {
        id: '1',
        label: 'hours',
        value: 'hours',
      },
      {
        id: '2',
        label: 'minutes',
        value: 'minutes',
      },
      {
        id: '3',
        label: 'liters',
        value: 'liters',
      },

      {
        id: '4',
        label: 'weight',
        value: 'weight',
      },
      {
        id: '5',
        label: 'general',
        value: 'general',
      },
    ],
    [],
  );

  const addQuest = useCallback(() => {
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        {
          name: 'Display',
          params: {
            newQuests: [
              ...(route.params?.quests as QuestType[]),
              {
                name: questName,
                description: questDescription,
                priority: questPriority,
                goal: 1,
              },
            ],
          },
        },
      ],
    });

    navigation.dispatch(resetAction);
  }, [questName, questDescription, questPriority, route.params]);

  const renderUnits = () => {
    if (questType !== '1') return null;
    return (
      <View>
        <Text>Select unit measurement type</Text>
        <RadioGroup
          containerStyle={{alignItems: 'flex-start'}}
          labelStyle={styles.radioLabel}
          radioButtons={questUnitRadio}
          onPress={setQuestUnits}
          selectedId={questUnits}
        />
      </View>
    );
  };

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.modalBackground} onPress={navigateBack} />
      <View
        style={{
          height: '80%',
        }}>
        <ScrollView
          style={styles.modal}
          contentContainerStyle={{
            gap: 20,
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}>
          <Text>Add Quest</Text>
          <TextInput
            value={questName}
            onChangeText={setQuestName}
            placeholder="Quest name"
            style={styles.input}
          />

          <Text>Quest priority type</Text>
          <RadioGroup
            containerStyle={{flexDirection: 'row'}}
            labelStyle={styles.radioLabel}
            radioButtons={questPriorityRadio}
            onPress={setQuestPriority}
            selectedId={questPriority}
          />
          <TextInput
            value={questDescription}
            onChangeText={setQuestDescription}
            placeholder="Quest description"
            style={[styles.input, {height: 170}]}
            multiline
          />

          <Text>Quest progression type</Text>
          <RadioGroup
            containerStyle={{alignItems: 'flex-start'}}
            labelStyle={styles.radioLabel}
            radioButtons={questProgression}
            onPress={setQuestType}
            selectedId={questType}
          />

          {renderUnits()}

          <Pressable onPress={addQuest} style={[styles.addQuest]}>
            <Text style={{color: 'white', fontSize: 18}}>Add Quest</Text>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    zIndex: 0,
  },
  modal: {
    width: screenWidth - 40,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  input: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'lightgray',
    textAlignVertical: 'top',
  },
  radioLabel: {color: 'gray'},
  addQuest: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
    gap: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
});
