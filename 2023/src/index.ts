import { Trebuchet } from "./tasks/01/Trebuchet";
import { CubeConundrum } from "./tasks/02/CubeConundrum";
import { GearRatios } from "./tasks/03/GearRatios";
import { Scratchcards } from "./tasks/04/Scratchcards";

const taskMapping: { [dayNumber: number]: new () => TaskInterface } = {
    1: Trebuchet,
    2: CubeConundrum,
    3: GearRatios,
    4: Scratchcards
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

    if (method === 'first') {
        taskInstance.solveFirst();
        return;
    }

    if (method === 'second') {
        taskInstance.solveSecond();
        return;
    }

    if (method === 'both') {
        taskInstance.solveBoth();
    }

}

main();

type MethodCall = 'first' | 'second' | 'both';
