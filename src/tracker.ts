//логика задач

import { saveTask, loadTasks, Task, saveCurrentTask, loadCurrentTask } from './storage';


let currentTask: Task | null = loadCurrentTask();


export function startTask(taskName: string) {
    console.log(`Attempting to start task: ${taskName}`);
    if (currentTask) {
        console.log(`Task "${currentTask.name}" is already running.`);
        return;
    }
    currentTask = { name: taskName, startTime: new Date().toISOString() };
    saveCurrentTask(currentTask);
    console.log(`Started task "${taskName}" with startTime: ${currentTask.startTime}`);
}


export function stopTask(taskName: string) {
    console.log(`Attempting to stop task: ${taskName}`);
    if (!currentTask || currentTask.name !== taskName) {
        console.log(`No running task named "${taskName}". Current task: ${currentTask ? currentTask.name : 'None'}`);
        return;
    }
    const endTime = new Date().toISOString();
    const task = { ...currentTask, endTime };
    saveTask(task);
    saveCurrentTask(null);
    currentTask = null;
    console.log(`Stopped task "${taskName}" with endTime: ${endTime}`);
}


export function generateReport() {
    console.log('Generating report');
    const tasks = loadTasks();
    tasks.forEach(task => {
        const startTime = new Date(task.startTime);
        const endTime = task.endTime ? new Date(task.endTime) : new Date();
        const duration = (endTime.getTime() - startTime.getTime()) / 1000;
        console.log(`Task: ${task.name}, Start: ${task.startTime}, End: ${task.endTime}, Duration: ${duration} seconds`);
    });
}
