import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {use, useCallback, useEffect, useMemo, useState} from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {QuestType, RootStackParams} from '../global/types.ts';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {Slider} from '@react-native-assets/slider';
import {colors} from '../global/colors.ts';
import uuid from 'react-native-uuid';
import {storage} from '../global/mmkv.ts';

export default function QuestCreatorModal({route}: any) {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const [questName, setQuestName] = useState('');
  const [questPriority, setQuestPriority] = useState('');
  const [questDescription, setQuestDescription] = useState('');
  const [questGoal, setQuestGoal] = useState<number>(1);

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
  useEffect(() => {
    console.log('goal: ' + questGoal);
  }, [questGoal]);

  const addQuest = useCallback(() => {
    console.log('goal: ' + questGoal);
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        {
          name: 'Display',
          params: {
            newQuests: [
              ...(route.params?.quests as QuestType[]),
              {
                id: uuid.v4(),
                name: questName,
                description: questDescription,
                priority: questPriority,
                goal: questGoal,
                progress: 0,
              },
            ],
          },
        },
      ],
    });

    storage.set(
      'quests',
      JSON.stringify([
        ...(route.params?.quests as QuestType[]),
        {
          id: uuid.v4(),
          name: questName,
          description: questDescription,
          priority: questPriority,
          goal: questGoal,
          progress: 0,
        },
      ]),
    );

    navigation.dispatch(resetAction);
  }, [questName, questDescription, questPriority, questGoal, route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.modalBackground} onPress={navigateBack} />
      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.modal}
          contentContainerStyle={styles.scrollContent}>
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

          <Text>Weekly goal</Text>
          <View style={styles.sliderContainer}>
            <Slider
              value={questGoal}
              onValueChange={setQuestGoal}
              style={styles.slider}
              minimumValue={1}
              maximumValue={24}
              step={1}
              minimumTrackTintColor={
                questPriority === '1' ? colors.accent : colors.soft
              }
              maximumTrackTintColor={colors.lightText}
              thumbTintColor={
                questPriority === '1' ? colors.accent : colors.soft
              }
            />
            <Text>{questGoal}</Text>
          </View>

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
    backgroundColor: colors.transparentBlack,
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    zIndex: 0,
  },
  modal: {
    width: screenWidth - 40,
    backgroundColor: colors.bg,
    borderRadius: 10,
  },
  input: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.lightText,
    textAlignVertical: 'top',
  },
  radioLabel: {color: colors.lightText},
  addQuest: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: colors.contrast,
    padding: 20,
    borderRadius: 10,
    gap: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  scrollContent: {
    gap: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  mainContainer: {
    height: '80%',
  },
  slider: {width: 300},
  sliderContainer: {alignSelf: 'center', gap: 10, flexDirection: 'row'},
});
