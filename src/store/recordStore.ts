import recordListModel from "@/models/recordListModel";

export default {
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => {
    recordListModel.create(record);
  },
};
