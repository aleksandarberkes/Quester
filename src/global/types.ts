export type RootStackParams = {
  Display: {newQuests: QuestType[]};
  Creator: {quests: QuestType[]};
  Modal: undefined;
};

export type QuestType = {
  name: string;
  description: string;
  priority: string;
  goal: number;
  unit: string;
};
