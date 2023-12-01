import { Trebuchet } from "./tasks/01/Trebuchet";

const taskMapping: { [dayNumber: number]: new () => TaskInterface } = {
    1: Trebuchet
}

function main() {
    const dayNumber = +(process.argv[2] ?? Object.keys(taskMapping)[Object.keys(taskMapping).length - 1]);
    const method = process.argv[3] as MethodCall ?? 'first';

    const TaskClass = taskMapping[dayNumber] ?? null;

    if (!TaskClass) {
        console.log('No task found');
        return;
    }

    const taskInstance = new TaskClass();

    if(method === 'first') {
        taskInstance.solveFirst();
        return;
    }

    if(method === 'second') {
        taskInstance.solveSecond();
        return;
    }

    if(method === 'both') {
        taskInstance.solveBoth();
    }

}

main();

type MethodCall = 'first' | 'second' | 'both';