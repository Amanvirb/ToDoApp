import { createSlice } from "@reduxjs/toolkit";
import { idle } from "../../app/common/options/sliceOpt";
import { INote, ITask } from "../../app/models/todo/task";
import { router } from "../../app/router/Routes";
import { toast } from "react-toastify";

interface Taskstate {
  taskIds: string[];
  tasksList: ITask[];
  taskDetail: ITask | null;
  taskDetailLoaded: boolean;
  tasksLoaded: boolean;
  taskStatus: string;
  addTaskStatus: string;
}

const initialState: Taskstate = {
  taskIds: [],
  tasksList: [],
  taskDetail: null,
  taskDetailLoaded: false,
  tasksLoaded: false,
  taskStatus: idle,
  addTaskStatus: idle,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    initTasks: (state) => {
      if (!state.tasksLoaded) {
        //Check if LS have task list and if yes set all the tasks and taskIds to the state
        const taskIds: string[] = JSON.parse(localStorage.getItem("taskIds")!);
        if (taskIds) {
          const taskList: ITask[] = [];
          taskIds.forEach((id) => {
            const task: ITask = JSON.parse(localStorage.getItem(id)!);
            if (task) {
              taskList.push(task);
            }
          });
          state.tasksList = taskList;
          state.taskIds = taskIds;
        }
        state.tasksLoaded = true;
      }
    },
    setTask: (state, action) => {
      //Check if parent taskId is exist, in case of sub task
      if (
        action.payload.parentId &&
        (!state.taskIds.includes(action.payload.parentId) ||
          !state.tasksList.some((x) => x.id === action.payload.parentId))
      ) {
        toast.success("No Parent Task found");
        return;
      }

      const newTask: ITask = {
        id: action.payload.id,
        parentId: action.payload.parentId,
        title: action.payload.title,
        subtitle: action.payload.subtitle,
        priority: action.payload.priority,
        dateTime: action.payload.dateTime,
        done: action.payload.done,
        notes: action.payload.notes,
      };

      state.tasksList.push(newTask);
      state.taskIds.push(newTask.id);

      let taskIds: string[] = JSON.parse(localStorage.getItem("taskIds")!);

      if (taskIds) {
        taskIds.push(newTask.id);
      } else {
        taskIds = [newTask.id];
      }
      //Update local storage
      localStorage.setItem("taskIds", JSON.stringify(taskIds));
      localStorage.setItem(newTask.id, JSON.stringify(newTask));
      toast.success("Task have been added successfully");
    },
    setTaskDetail: (state, action) => {
      const taskDetail = state.tasksList.find((x) => x.id == action.payload);
      if (taskDetail !== undefined) {
        state.taskDetail = taskDetail;
      } else {
        state.taskDetail = null;
      }
      state.taskStatus = idle;
      state.taskDetailLoaded = true;
    },
    deleteTask: (state, action) => {
      //If task have subtasks 
      //Take all task where taskId or taskParentId is equal to payload      

      const deletableTasks = state.tasksList.filter(
        (x) => x.id === action.payload || x.parentId === action.payload
      );

      for (const deletableTask of deletableTasks) {
        let taskIndex = state.tasksList.findIndex(
          (x) => x.id === deletableTask.id
        );
        if (taskIndex !== undefined && taskIndex >= 0) {
          state.tasksList.splice(taskIndex, 1);
          localStorage.removeItem(deletableTask.id);
        }
        //Remove taskid from taskIds
        taskIndex = state.taskIds.findIndex((x) => x === deletableTask.id);
        if (taskIndex !== undefined && taskIndex >= 0) {
          state.taskIds.splice(taskIndex, 1);
          localStorage.setItem("taskIds", JSON.stringify(state.taskIds));
        }
      }

      state.taskStatus = idle;

      //check parent task has been deleted then redirect the user to home page
      if (deletableTasks.some((x) => x.id === action.payload))
        router.navigate("/");
      toast.success("Task have been deleted successfully");
    },
    deleteAllTask: (state) => {
      localStorage.clear();
      state.tasksList = [];
      state.taskIds = [];
      toast.success("All tasks have been deleted successfully");
    },

    editTask: (state, action) => {
      const taskIndex = state.tasksList.findIndex(
        (x) => x.id === action.payload.id
      );
      if (taskIndex < 0 || taskIndex === undefined) return;
      if (taskIndex >= 0) {
        let updatedTask = state.tasksList[taskIndex];
        updatedTask = {
          ...updatedTask,
          ...action.payload,
        };

        state.tasksList[taskIndex] = updatedTask;
        state.taskDetail = updatedTask;
        localStorage.setItem(action.payload.id, JSON.stringify(updatedTask));
      }
      state.taskStatus = idle;
      toast.success("Task updated");
    },

    setAddTaskNote: (state, action) => {
      const taskId = state.taskDetail?.id;
      if(taskId) {
        const newNote: INote = {
          id: action.payload.id,
          detail: action.payload.note,
          date: new Date(),
        };
        const taskIndex = state.tasksList.findIndex((x) => x.id == taskId);
  
        if (taskIndex < 0 || taskIndex === undefined) return;
        if (taskIndex >= 0) {
          const updatedTask = state.tasksList[taskIndex];
  
          updatedTask.notes.push(newNote);
          state.tasksList[taskIndex] = updatedTask;
          state.taskDetail = updatedTask;
  
          localStorage.setItem(taskId, JSON.stringify(updatedTask));
        }
        toast.success("Task notes added");
      }
      

    },
    deleteTaskNote: (state, action) => {
      const taskIndex = state.tasksList.findIndex(
        (x) => x.id === action.payload.taskId
      );

      if (taskIndex !== undefined && taskIndex >= 0) {
        const noteIndex = state.tasksList[taskIndex].notes.findIndex(
          (x) => x.id === action.payload.noteId
        );

        const updatedTask = state.tasksList[taskIndex];
        updatedTask.notes.splice(noteIndex, 1);
        state.tasksList[taskIndex] = updatedTask;
        state.taskDetail = updatedTask;
        localStorage.setItem(
          action.payload.taskId,
          JSON.stringify(updatedTask)
        );
      }
      toast.success("Task note deleted");

      state.taskStatus = idle;
    },
    updateTaskNote: (state, action) => {
      const taskIndex = state.tasksList.findIndex(
        (x) => x.id === action.payload.taskId
      );

      if (taskIndex !== undefined && taskIndex >= 0) {
        const noteIndex = state.tasksList[taskIndex].notes.findIndex(
          (x) => x.id === action.payload.id
        );
        const updatedTask = state.tasksList[taskIndex];

        const newNote: INote = {
          id: action.payload.id,
          detail: action.payload.detail,
          date: new Date(),
        };

        updatedTask.notes[noteIndex] = newNote;

        state.tasksList[taskIndex] = updatedTask;
        state.taskDetail = updatedTask;
        localStorage.setItem(
          action.payload.taskId,
          JSON.stringify(updatedTask)
        );
      }

      toast.success("Task note have been updated successfully");

      state.taskStatus = idle;

    },
    setDoneTask: (state, action) => {
      const taskIndex = state.tasksList.findIndex(
        (x) => x.id === action.payload.id
      );
      if (taskIndex < 0 || taskIndex === undefined) return;
      if (taskIndex >= 0) {
        let updatedTask = state.tasksList[taskIndex];

        updatedTask = {
          ...updatedTask,
          done: !state.tasksList[taskIndex].done,
        };

        state.tasksList[taskIndex] = updatedTask;
        state.taskDetail = updatedTask;
        localStorage.setItem(action.payload.id, JSON.stringify(updatedTask));
        toast.success(`Task marked as ${updatedTask.done ? 'completed' : 'incomplete'}`);
      }
      state.taskStatus = idle;
    },
    resetTaskDetailLoaded: (state) => {
      state.taskDetailLoaded = false;
    },
  },
});

export const {
  setTask,
  setTaskDetail,
  initTasks,
  deleteTask,
  deleteAllTask,
  editTask,
  resetTaskDetailLoaded,
  setAddTaskNote,
  deleteTaskNote,
  updateTaskNote,
  setDoneTask,
} = taskSlice.actions;
