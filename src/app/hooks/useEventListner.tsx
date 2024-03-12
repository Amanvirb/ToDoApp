import { FieldValues } from "react-hook-form";
import { deleteTask, deleteAllTask, deleteTaskNote, editTask, resetTaskDetailLoaded, setAddTaskNote, setDoneTask, setTaskDetail, setTask, updateTaskNote } from "../../features/task/taskSlice";
import { useAppDispatch, useAppSelector } from "../stores/configureStore";
import { ICheckBox, INoteAction } from "../models/todo/task";

const useEventListner = () => {

  const dispatch = useAppDispatch();

  const { tasksList, tasksLoaded, taskStatus, taskDetail, taskDetailLoaded,

  } = useAppSelector((state) => state.task);

  const setTaskHandler = (values: FieldValues) => {
    dispatch(setTask(values))
  }
  const deleteTaskHandler = (id: string) => {
    dispatch(deleteTask(id))
  }
  const deleteAllTaskHandler = () => {
    dispatch(deleteAllTask())
  }
  const editTaskHandler = (values: FieldValues) => {
    dispatch(editTask(values))
  }
  const taskDetailHandler = (id: string) => {
    dispatch(setTaskDetail(id))
  }
  const taskDetailLoadedHandler = () => {
    dispatch(resetTaskDetailLoaded())
  }
  const addTaskNoteHandler = (values: FieldValues) => {
    dispatch(setAddTaskNote(values))
  }
  const deleteTaskNoteHandler = (values: INoteAction) => {
    dispatch(deleteTaskNote(values))
  }
  const updateTaskNoteHandler = (values: FieldValues) => {
    dispatch(updateTaskNote(values))
  }
  const doneTaskHandler = (data: ICheckBox) => {
    dispatch(setDoneTask(data));
  }

  return {
    setTaskHandler,
    deleteTaskHandler,
    deleteAllTaskHandler,
    editTaskHandler,
    taskDetailHandler,
    taskDetailLoadedHandler,
    addTaskNoteHandler,
    deleteTaskNoteHandler,
    updateTaskNoteHandler,
    doneTaskHandler,
    taskDetail,
    tasksList,
    tasksLoaded,
    taskDetailLoaded,
    taskStatus
  };
};

export default useEventListner;
