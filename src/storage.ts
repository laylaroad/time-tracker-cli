//хранение и загрузка задач

import fs from 'fs';
import path from 'path';

const storagePath = path.resolve(__dirname, '..', 'tasks.json');
const currentTaskPath = path.resolve(__dirname, '..', 'currentTask.json');

export interface Task {
    name: string;
    startTime: string;
    endTime?: string;
}

export function saveTask(task: Task) {
    const tasks = loadTasks();
    tasks.push(task);
    console.log(`Saving tasks: ${JSON.stringify(tasks, null, 2)}`);
    fs.writeFileSync(storagePath, JSON.stringify(tasks, null, 2));
    console.log(`Tasks saved to ${storagePath}`);
}

export function loadTasks(): Task[] {
    if (!fs.existsSync(storagePath)) {
        console.log(`No tasks file found at ${storagePath}`);
        return [];
    }
    const data = fs.readFileSync(storagePath, 'utf8');
    console.log(`Loaded tasks: ${data}`);
    return JSON.parse(data);
}

export function saveCurrentTask(task: Task | null) {
    if (task) {
        console.log(`Saving current task: ${JSON.stringify(task, null, 2)}`);
        fs.writeFileSync(currentTaskPath, JSON.stringify(task, null, 2));
    } else if (fs.existsSync(currentTaskPath)) {
        console.log(`Deleting current task file at ${currentTaskPath}`);
        fs.unlinkSync(currentTaskPath);
    }
}

export function loadCurrentTask(): Task | null {
    if (!fs.existsSync(currentTaskPath)) {
        console.log(`No current task file found at ${currentTaskPath}`);
        return null;
    }
    const data = fs.readFileSync(currentTaskPath, 'utf8');
    console.log(`Loaded current task: ${data}`);
    return JSON.parse(data);
}
