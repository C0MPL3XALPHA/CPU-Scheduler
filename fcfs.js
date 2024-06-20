export function fcfs(process) {
    // Sort process by arrival time
    process.sort((a, b) => a.arrival_time - b.arrival_time);
    var result=[];
    let num_process = process.length;
    let execution_lower = Array(num_process).fill(0);
    let execution_higher = Array(num_process).fill(0);
    let waiting = Array(num_process).fill(0);
    let turnaround = Array(num_process).fill(0);

    console.log("\nFCFS Scheduling:\n\n");
    let current_time = 0;
    let total_turnaround_time = 0;
    let total_waiting_time = 0;

    process.forEach(p => {
        // Wait if the process hasn't arrived yet
        if (current_time < p.arrival_time) {
            current_time = p.arrival_time;
        }

        // Execute the process
        execution_lower[p.id - 1] = current_time;
        current_time += p.burst_time;
        execution_higher[p.id - 1] = current_time;
        turnaround[p.id - 1] = current_time - p.arrival_time;
        waiting[p.id - 1] = turnaround[p.id - 1] - p.burst_time;
        total_turnaround_time += turnaround[p.id - 1];
        total_waiting_time += waiting[p.id - 1];
        result.push({ id: p.id,current_time:current_time, start: execution_lower[p.id-1],end: execution_higher[p.id-1],turnaround:turnaround[p.id-1], wait:waiting[p.id-1] });
    });

    process.sort((a, b) => a.id - b.id);

    process.forEach(p => {
        console.log(`process ${p.id} executed during time ${execution_lower[p.id - 1]} to ${execution_higher[p.id - 1]} unit`);
        console.log(`Turn Around Time for process ${p.id} is ${turnaround[p.id - 1]} unit`);
        console.log(`Waiting Time for process ${p.id} is ${waiting[p.id - 1]} unit\n`);
    });

    let average_waiting_time = total_waiting_time / num_process;
    let average_turnaround_time = total_turnaround_time / num_process;

    console.log(`Average Turn Around Time: ${average_turnaround_time} unit`);
    console.log(`Average Waiting Time: ${average_waiting_time} unit`);
    return {
        avg_turnaround_time: average_turnaround_time,
        avg_waiting_time: average_waiting_time,
        result: result
    };
}
