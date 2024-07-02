# Time Tracker CLI

This is a command-line tool for tracking time spent on the tasks and projects.

## Features

- Start and stop timers for tasks
- Track time spent on each task
- Generate time reports
- Save the all data

## Stack:

- TypeScript
- Node.js
- React

## Installation

```sh
npm install
```

## How to run:

Start a task:

```sh
npx ts-node src/index.ts start "Task Name"
```

Stop a task:

```sh
npx ts-node src/index.ts stop "Task Name"
```

Generate a report of all tracked tasks:

```sh
npx ts-node src/index.ts report
```
