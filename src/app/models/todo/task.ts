export interface INote {
  id: string;
  detail: string;
  date: Date;
}
export interface ISelectOpt {
  text: string;
  value: number;
}

export interface ITask {
  id: string;
  parentId: string;
  title: string;
  subtitle: string;
  priority: number;
  dateTime: Date;
  done: boolean;
  notes: INote[];
}
export interface INoteAction {
  taskId: string;
  noteId: string;
}
export interface ICheckBox {
  id: string;
  value: boolean;
}
