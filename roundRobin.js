export function roundRobin(processes, quantum) {
    let current_time = 0;
    let total_turnaround_time = 0;
    let total_waiting_time = 0;
    let tasks_completed = 0;

    // Sort tasks by arrival time
    processes.sort((a, b) => a.arrival - b.arrival);

    // Queue to manage the round-robin order
    let taskQueue = [];
    let taskIndex = 0;
    let execution = Array.from({ length: processes.length }, () => []);

    // Add initial tasks to the queue
    while (taskIndex < processes.length && processes[taskIndex].arrival <= current_time) {
        taskQueue.push(processes[taskIndex]);
        taskIndex++;
    }

    while (tasks_completed < processes.length) {
        if (taskQueue.length > 0) {
            let task = taskQueue.shift();
            let exec_time = Math.min(quantum, task.burst);

            execution[task.id - 1].push([current_time, current_time + exec_time]);
            task.burst -= exec_time;
            current_time += exec_time;

            // Add new tasks to the queue that have arrived
            while (taskIndex < processes.length && processes[taskIndex].arrival <= current_time) {
                taskQueue.push(processes[taskIndex]);
                taskIndex++;
            }

            if (task.burst > 0) {
                taskQueue.push(task);
            } else {
                let turnaround_time = current_time - task.arrival;
                let waiting_time = turnaround_time - task.originalBurst;

                total_turnaround_time += turnaround_time;
                total_waiting_time += waiting_time;
                tasks_completed++;
            }
        } else {
            current_time++;
        }
    }

    // Sort tasks back by their IDs for output consistency
    processes.sort((a, b) => a.id - b.id);

    var result = processes.map((task, index) => {
        let start = execution[task.id - 1][0][0];
        let end = execution[task.id - 1][execution[task.id - 1].length - 1][1];
        let turnaround_time = end - task.arrival;
        let waiting_time = turnaround_time - task.originalBurst;

        return {
            id: task.id,
            start: start,
            end: end,
            turn_around: turnaround_time,
            wait: waiting_time
        };
    });

    let average_waiting_time = total_waiting_time / processes.length;
    let average_turnaround_time = total_turnaround_time / processes.length;

    console.log(`Average Turn Around Time: ${average_turnaround_time} units`);
    console.log(`Average Waiting Time: ${average_waiting_time} units`);

    return {
        avg_turnaround_time: average_turnaround_time,
        avg_waiting_time: average_waiting_time,
        result: result
    };
}