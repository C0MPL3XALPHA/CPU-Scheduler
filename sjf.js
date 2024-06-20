export function sjf(processes) {
    let num_tasks = processes.length;
    let bursttime = Array(num_tasks);
    for (let i = 0; i < num_tasks; i++) {
        bursttime[processes[i].id - 1] = processes[i].burst;
    }

    // Sort tasks primarily by arrival time, secondarily by burst time
    processes.sort((a, b) => {
        if (a.arrival === b.arrival) {
            return a.burst - b.burst;
        }
        return a.arrival - b.arrival;
    });

    let execution = Array.from({ length: num_tasks }, () => []);
    console.log("\nSJF Scheduling:\n");
    let current_time = 0;
    let total_turnaround_time = 0;
    let total_waiting_time = 0;
    let tasks_completed = 0;

console.log("Pragyan");

    while (tasks_completed < num_tasks) {
        let shortest_job_index = -1;
        for (let i = 0; i < num_tasks; ++i) {
            if (processes[i].arrival <= current_time && processes[i].burst > 0) {
                if (shortest_job_index === -1 || processes[i].burst < processes[shortest_job_index].burst) {
                    shortest_job_index = i;
                }
            }
        }

        if (shortest_job_index === -1) {
            // No task is ready to execute, move to the next available task's arrival time
            current_time++;
            continue;
        }

        let task = processes[shortest_job_index];
        task.burst--;
        execution[task.id - 1].push(current_time);

        if (task.burst === 0) {
            tasks_completed++;
        }

        current_time++;
    }

    // Sort tasks back by their IDs for output consistency
    processes.sort((a, b) => a.id - b.id);

    var result = processes.map((task, index) => {
        let start = execution[task.id - 1][0];
        let end = execution[task.id - 1][execution[task.id - 1].length - 1] + 1;
        let completion_time = end;
        let turnaround_time = completion_time - task.arrival;
        let waiting_time = turnaround_time - bursttime[task.id - 1];
        total_turnaround_time += turnaround_time;
        total_waiting_time += waiting_time;

        console.log("Pandey");

        return {
            id: task.id,
            start: start,
            end: end,
            turn_around: turnaround_time,
            wait: waiting_time
        };
    });

    let average_waiting_time = total_waiting_time / num_tasks;
    let average_turnaround_time = total_turnaround_time / num_tasks;

    console.log(`Average Turn Around Time: ${average_turnaround_time} units`);
    console.log(`Average Waiting Time: ${average_waiting_time} units`);

    return {
        avg_turnaround_time: average_turnaround_time,
        avg_waiting_time: average_waiting_time,
        result: result
    };
}
    