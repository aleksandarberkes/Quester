import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {use, useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {QuestType, RootStackParams} from '../global/types.ts';
import {FlatList} from 'react-native-gesture-handler';
import QuestComponent from '../components/QuestComponent';
import {colors} from '../global/colors.ts';
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {storage} from '../global/mmkv.ts';

export default function QuestsDisplay({route}: any) {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const [quests, setQuests] = useState<QuestType[]>([]);

  useEffect(() => {
    const questsFromStorage = storage.getString('quests');
    if (questsFromStorage) setQuests(JSON.parse(questsFromStorage));
  }, []);

  useEffect(() => {
    if (route.params?.newQuests !== undefined) {
      setQuests(route.params?.newQuests);
    }
  }, [route.params]);

  const navigateToAddQuest = useCallback(() => {
    navigation.navigate('Creator', {quests: quests});
  }, [navigation, quests]);

  const renderMainQuests = useCallback(
    ({item}: {item: QuestType}) => {
      if (item.priority === '1')
        return (
          <QuestComponent
            id={item.id}
            name={item.name}
            description={item.description}
            goal={item.goal}
            priority={item.priority}
            progress={item.progress}
            allQuests={quests}
          />
        );
      return <></>;
    },
    [quests],
  );

  const renderSideQuests = useCallback(
    ({item}: {item: QuestType}) => {
      if (item.priority === '2')
        return (
          <QuestComponent
            id={item.id}
            name={item.name}
            description={item.description}
            goal={item.goal}
            priority={item.priority}
            progress={item.progress}
            allQuests={quests}
          />
        );
      return <></>;
    },
    [quests],
  );

  const resetProgress = useCallback(async () => {
    const resetQuests = quests.map((q: any) => ({...q, progress: 0}));
    setQuests(resetQuests);
    storage.set('quests', JSON.stringify(resetQuests));
  }, [quests]);

  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={[styles.resetButton, {top: insets.top ? insets.top : 10}]}
        onPress={resetProgress}>
        <Image
          source={require('../assets/images/refresh.png')}
          style={styles.resetImage}
        />
      </Pressable>
      <TouchableOpacity
        style={styles.addQuest}
        activeOpacity={0.7}
        onPress={navigateToAddQuest}>
        <Image
          source={require('../assets/images/plus.png')}
          style={styles.addImage}
        />
        <Text>Add Quest</Text>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.mainTitle}>Main Quests</Text>
      </View>
      <View style={styles.mainLine}></View>
      <FlatList
        data={quests}
        renderItem={renderMainQuests}
        style={styles.flatList}
      />
      <View style={styles.textContainer}>
        <Text style={styles.sideTitle}>Side Quests</Text>
      </View>
      <View style={styles.sideLine}></View>
      <FlatList
        data={quests}
        renderItem={renderSideQuests}
        style={styles.flatList}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    paddingVertical: 20,
  },
  resetButton: {
    position: 'absolute',
    left: 20,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightText,
  },
  resetImage: {height: 20, aspectRatio: 1},
  addQuest: {
    width: 200,
    height: 40,
    backgroundColor: colors.contrast,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 20,
    alignSelf: 'flex-end',
    marginRight: 10,
    alignContent: 'center',
  },
  textContainer: {width: '100%', paddingLeft: 20},
  addImage: {height: 20, width: 20},
  flatList: {
    flexGrow: 0,
    width: '80%',
    marginTop: 10,
    marginLeft: 10,
  },
  mainTitle: {
    fontSize: 14,
    color: colors.accent,
    marginTop: 10,
    opacity: 0.6,
    marginLeft: 10,
  },
  sideTitle: {
    fontSize: 14,
    color: colors.soft,
    marginTop: 10,
    opacity: 0.7,
    marginLeft: 10,
  },
  mainLine: {
    width: '90%',
    height: 3,
    backgroundColor: colors.accent,
    borderRadius: 10,
    opacity: 0.6,
  },
  sideLine: {
    width: '90%',
    height: 3,
    backgroundColor: colors.soft,
    borderRadius: 10,
    opacity: 0.7,
  },
});
