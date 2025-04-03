import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {QuestType, RootStackParams} from '../global/types';
import {FlatList} from 'react-native-gesture-handler';

export default function QuestsDisplay({route}: any) {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const [quests, setQuests] = useState<QuestType[]>([]);

  useEffect(() => {
    console.log('new:');
    console.log(route.params?.newQuests);
    if (route.params?.newQuests) {
      console.log('set');
      setQuests(route.params?.newQuests);
    }
  }, [route.params]);

  const navigateToAddQuest = useCallback(() => {
    console.log(quests);
    navigation.navigate('Creator', {quests: quests});
  }, [navigation, quests]);

  const renderQuests = useCallback(
    ({item}: {item: QuestType}) => <Text>{item.name}</Text>,
    [],
  );
  return (
    <SafeAreaView style={styles.container}>
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

      <FlatList data={quests} renderItem={renderQuests} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', padding: 20},
  addQuest: {
    width: '90%',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 20,
  },
  addImage: {height: 20, width: 20},
});
