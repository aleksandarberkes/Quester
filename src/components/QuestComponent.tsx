import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {QuestType, RootStackParams} from '../global/types.ts';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {colors} from '../global/colors.ts';

export default function QuestComponent({
  id,
  name,
  description,
  goal,
  priority,
  progress,
  allQuests,
}: any) {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const navigateToQuestModal = useCallback(() => {
    navigation.navigate('Modal', {
      questInfo: {
        id: id,
        name: name,
        description: description,
        goal: goal,
        priority: priority,
        progress: progress,
      },
      quests: allQuests,
    });
  }, [navigation, id, name, description, goal, priority, progress]);

  return (
    <Pressable
      style={[
        styles.mainContainer,
        {backgroundColor: priority === '1' ? colors.accent : colors.soft},
      ]}
      onPress={navigateToQuestModal}>
      <Text
        style={
          priority === '1'
            ? styles.mainQuestTitleText
            : styles.sideQuestTitleText
        }>
        {name}
      </Text>
      <View style={styles.descriptionContainer}>
        <Text
          style={
            priority === '1'
              ? styles.mainQuestDescText
              : styles.sideQuestDescText
          }>
          {description}
        </Text>
        <Text
          style={
            priority === '1'
              ? styles.mainQuestGoalText
              : styles.sideQuestGoalText
          }>
          {progress} / {goal}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    gap: 5,
    marginVertical: 5,
    padding: 20,
    borderRadius: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  mainQuestTitleText: {color: colors.white, fontWeight: '700', fontSize: 18},
  mainQuestDescText: {color: colors.white, fontSize: 12, width: '80%'},
  mainQuestGoalText: {
    color: colors.white,
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: '700',
  },
  sideQuestTitleText: {color: colors.black, fontWeight: '700', fontSize: 14},
  sideQuestDescText: {color: colors.black, fontSize: 10, width: '80%'},
  sideQuestGoalText: {
    color: colors.black,
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '700',
  },
});
