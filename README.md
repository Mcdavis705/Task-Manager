# 🗂️ Eisenhower Matrix Task Manager (React)

A productivity tool built in React to implement the **Eisenhower Matrix**, using **drag and drop**, **task input via modal**, and **LocalStorage** for persistent task saving.

---

## 🧠 Project Goal

Create a task manager with:
- Four labeled drag-and-drop quadrants:
  1. ✅ DO
  2. 🕒 DECIDE
  3. ⚠️ DELEGATE
  4. ❌ DELETE
- A modal input to add tasks to any quadrant
- Ability to drag tasks across quadrants
- Only allow deleting tasks in quadrant 4
- Save/load tasks using `localStorage`

---

## 🧱 Structure & Components

- **Matrix.jsx**:  
  Main component handling layout, drag-and-drop logic, and state management.

- **TaskCard.jsx**:  
  Displays an individual task. Implements `draggable` behavior.

- **AddTaskModal.jsx**:  
  Controlled modal input component for creating new tasks.

- **localStorage utils**:  
  Handles `saveTasks()` and `loadTasks()` for local persistence.

---

## ⚙️ State & Logic

- **States:**
  - `tasks`: An object mapping quadrant IDs to arrays of task strings
  - `currentTask`: Input text for the new task
  - `showModal`: Boolean to toggle modal
  - `activeQuadrant`: Target quadrant for task insertion

- **Functions:**
  - `addTask()`: Push new task into chosen quadrant
  - `onDragStart/Drop()`: Moves tasks between quadrants
  - `deleteTask()`: Removes a task (only from bottom-right quadrant)
  - `saveTasks()`: Saves current state to `localStorage`
  - `loadTasks()`: Loads saved state on mount

---

## 💡 How It Works

1. App loads → tasks auto-loaded from `localStorage`
2. User clicks "Add Task" → modal opens
3. User types and selects target quadrant → task added
4. Tasks can be freely moved across quadrants by drag & drop
5. Tasks in quadrant 4 have a delete button
6. User clicks "Save Tasks" to persist data

---

## 🎯 Learnings

- Dynamic rendering of quadrant-based UI  
- Drag & drop with clean state updates  
- Controlled modals and input handling in React  
- Data persistence with `localStorage` and lifecycle methods

---

## 🔮 Future Additions 

- 🌓 Dark mode toggle 
- 📱 Mobile-friendly responsive layout 
- ✏️ Edit existing tasks 
- 🗓️ Add due dates and reminders

---


## 📦 Installation

```bash
git clone https://github.com/your-username/eisenhower-matrix.git
cd eisenhower-matrix
npm install
npm run dev
