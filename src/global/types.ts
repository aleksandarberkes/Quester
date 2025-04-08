export type RootStackParams = {
  Display: {newQuests: QuestType[]};
  Creator: {quests: QuestType[]};
  Modal: {questInfo: QuestType; quests: QuestType[]};
};

export type QuestType = {
  id: string;
  name: string;
  description: string;
  priority: string;
  goal: number;
  progress: number;
};
