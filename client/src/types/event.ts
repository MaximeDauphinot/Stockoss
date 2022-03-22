export type EventDatas = {
  title: string;
  description: string;
  email: string;
  date: Date;
  cover: string;
  comments: [
    {
      auteur: string;
      commentaire: string;
    }
  ];
};

export type GetEventDatas = EventDatas & {
  _id: string;
};

export type Comment = {
  auteur: string;
  commentaire: string;
};
