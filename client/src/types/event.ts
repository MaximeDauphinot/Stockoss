export type EventDatas = {
  title: string;
  description: string;
  email: string;
  date: Date | null;
  cover: string;
};

export type GetEventDatas = EventDatas & {
  _id: string;
};
