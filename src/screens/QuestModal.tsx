import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {QuestType, RootStackParams} from '../global/types.ts';
import {colors} from '../global/colors.ts';
import {Slider} from '@react-native-assets/slider';
import {storage} from '../global/mmkv.ts';

export default function QuestModal({route}: any) {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const [questProgress, setQuestProgress] = useState(
    route.params?.questInfo.progress,
  );

  const addProgress = useCallback(() => {
    if (questProgress < route.params?.questInfo.goal)
      setQuestProgress(questProgress + 1);
  }, [questProgress]);
  const removeProgress = useCallback(() => {
    if (questProgress !== 0) setQuestProgress(questProgress - 1);
  }, [questProgress]);

  const saveProgress = useCallback(() => {
    const updatedQuests = route.params?.quests;

    for (let i = 0; i < updatedQuests.length; i++) {
      if (updatedQuests[i].id === route.params?.questInfo.id)
        updatedQuests[i].progress = questProgress;
    }

    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        {
          name: 'Display',
          params: {
            newQuests: updatedQuests,
          },
        },
      ],
    });

    storage.set('quests', JSON.stringify(updatedQuests));

    navigation.dispatch(resetAction);
  }, [navigation, route.params, questProgress]);

  const deleteQuest = useCallback(() => {
    const updatedQuests = route.params?.quests;

    for (let i = 0; i < updatedQuests.length; i++) {
      if (updatedQuests[i].id === route.params?.questInfo.id) {
        for (let j = i; j < updatedQuests.length - 1; j++)
          updatedQuests[j] = updatedQuests[j + 1];
        updatedQuests.pop();
        break;
      }
    }

    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        {
          name: 'Display',
          params: {
            newQuests: updatedQuests,
          },
        },
      ],
    });

    storage.set('quests', JSON.stringify(updatedQuests));

    navigation.dispatch(resetAction);
  }, [navigation, route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.modalBackground} onPress={navigateBack} />

      <View style={styles.modal}>
        <Pressable style={styles.trashButton} onPress={deleteQuest}>
          <Image
            source={require('../assets/images/bin.png')}
            style={styles.trashImage}
          />
        </Pressable>
        <Text style={styles.titleText}>{route.params?.questInfo.name}</Text>
        <Text
          style={[styles.descriptionText, {fontWeight: '700', marginTop: 10}]}>
          Description:
        </Text>
        <Text
          style={[styles.descriptionText, {fontWeight: '300', marginLeft: 10}]}>
          {route.params?.questInfo.description}
        </Text>
        <Text style={styles.progressTitle}>Progress</Text>
        <View style={styles.progressPanel}>
          <TouchableOpacity
            onPress={removeProgress}
            activeOpacity={0.8}
            style={[styles.progressButton, {backgroundColor: colors.accent}]}>
            <Image
              source={require('../assets/images/minus.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <Slider
            enabled={false}
            value={questProgress}
            onValueChange={setQuestProgress}
            style={styles.slider}
            minimumValue={0}
            maximumValue={route.params?.questInfo.goal}
            step={1}
            minimumTrackTintColor={
              route.params?.questInfo.priority === '1'
                ? colors.accent
                : colors.soft
            }
            maximumTrackTintColor={colors.lightText}
            thumbTintColor={
              route.params?.questInfo.priority === '1'
                ? colors.accent
                : colors.soft
            }
          />
          <Text style={styles.goalText}>{questProgress}</Text>
          <TouchableOpacity
            onPress={addProgress}
            activeOpacity={0.8}
            style={[styles.progressButton, {backgroundColor: colors.contrast}]}>
            <Image
              source={require('../assets/images/plus.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={saveProgress} style={styles.saveButton}>
          <Text style={styles.saveText}>Save Progress</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  modalBackground: {
    backgroundColor: colors.transparentBlack,
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    zIndex: 0,
  },
  trashButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightText,
    zIndex: 10,
  },
  trashImage: {height: 30, aspectRatio: 1},
  modal: {
    position: 'relative',
    height: screenHeight - 200,
    width: screenWidth - 40,
    backgroundColor: colors.bg,
    borderRadius: 10,
    padding: 10,
  },
  progressPanel: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 10,
    marginVertical: 20,
  },
  image: {height: '100%', aspectRatio: 1},
  progressButton: {width: '15%', padding: 10, borderRadius: 10, aspectRatio: 1},
  slider: {width: '50%'},
  goalText: {fontSize: 18, alignSelf: 'center'},
  titleText: {fontSize: 18, fontWeight: '700'},
  descriptionText: {fontSize: 14},
  progressTitle: {fontSize: 16, fontWeight: '700', marginTop: 10},
  saveButton: {
    backgroundColor: colors.contrast,
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
  },
  saveText: {fontSize: 16, color: colors.white},
});
