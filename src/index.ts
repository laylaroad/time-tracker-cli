//файл, который будет обрабатывать команды CLI

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { startTask, stopTask, generateReport } from './tracker';

yargs(hideBin(process.argv))
    .command('start [task]', 'Start a task', (yargs) => {
        return yargs.positional('task', {
            describe: 'Name of the task',
            type: 'string'
        });
    }, (argv) => {
        if (argv.task) {
            startTask(argv.task as string);
        }
    })
    .command('stop [task]', 'Stop a task', (yargs) => {
        return yargs.positional('task', {
            describe: 'Name of the task',
            type: 'string'
        });
    }, (argv) => {
        if (argv.task) {
            stopTask(argv.task as string);
        }
    })
    .command('report', 'Generate report', () => {
        generateReport();
    })
    .help()
    .argv;
