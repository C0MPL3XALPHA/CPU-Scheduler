// runScheduler.js
import { fcfs } from './fcfs.js';
import { sjf } from './sjf.js';
import { priorityScheduling } from './priorityScheduling.js';
import { roundRobin } from './roundRobin.js';
import { displayResult } from './displayResult.js';

export function runScheduler() {
    var processesInput = document.getElementById('processes').value.trim();
    var algorithm = document.getElementById('algorithm').value;
    var quantum = parseInt(document.getElementById('quantum').value, 10);

    var processes = processesInput.split('\n').map(function(line) {
        var parts = line.split(',').map(Number);
        return { id: parts[0], arrival_time: parts[1], burst_time: parts[2], remaining_time: parts[2], priority: parts[3] || 0 };
    });

    var res;
    switch (algorithm) {
        case 'fcfs':
            res = fcfs(processes);
            break;
        case 'sjf':
            res = sjf(processes);
            break;
        case 'priority':
            res = priorityScheduling(processes);
            break;
        case 'rr':
            res = roundRobin(processes, quantum);
            break;
        default:
            alert('Invalid algorithm selected');
            return;
    }
    console.log(res);

    displayResult(res);
}
