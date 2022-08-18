type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?: Date;
};

type Tag = {
  id: string;
  name: string;
};

type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => "success" | "duplicated";
  update: (id: string, name: string) => "success" | "not found" | "duplicated";
  remove: (id: string) => boolean;
  save: () => void;
};

interface Window {
  recordList: RecordItem[];
  createRecord: (record: RecordItem) => void;

  tagList: Tag[];
  createTag: (name: string) => void;
  removeTag: (id: string) => boolean;
  updateTag: TagListModel["update"];
  findTag: (id: string) => Tag | undefined;
}
