// displayResult.js
export function displayResult(results) {
    const outputElement = document.getElementById('output');
    outputElement.innerHTML = '';

    results.result.forEach(task => {
        outputElement.innerHTML += `Task ${task.id} executed from ${task.start} to ${task.end}\n`;
        outputElement.innerHTML += `Turnaround Time: ${task.turn_around}\n`;
        outputElement.innerHTML += `Waiting Time: ${task.wait}\n\n`;
    });

    outputElement.innerHTML += `\nAverage Turnaround Time: ${results.avg_turnaround_time}\n`;
    outputElement.innerHTML += `Average Waiting Time: ${results.avg_waiting_time}\n`;
}
