import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push({
        id: Date.now(),
        name: action.payload.name,
        description: action.payload.description || "",
        dueDate: action.payload.dueDate || "",
        createdDate: new Date().toLocaleDateString(),
        priority: action.payload.priority || "P2",
      });
    },
    updateTask: (state, action) => {
      const { id, name, description, dueDate, priority } = action.payload;
      const taskToUpdate = state.find((task) => task.id === id);
      if (taskToUpdate) {
        taskToUpdate.name = name;
        taskToUpdate.description = description;
        taskToUpdate.dueDate = dueDate;
        taskToUpdate.priority = priority;
      }
    },
    deleteTask: (state, action) => {
      const idToDelete = action.payload;
      return state.filter((task) => task.id !== idToDelete);
    },

    toggleTaskCompletion: (state, action) => {
      const taskId = action.payload;
      const taskToToggle = state.find((task) => task.id === taskId);
      if (taskToToggle) {
        taskToToggle.isCompleted = !taskToToggle.isCompleted;
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, toggleTaskCompletion } =
  taskSlice.actions;
export default taskSlice.reducer;
