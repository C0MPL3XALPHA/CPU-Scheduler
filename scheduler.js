import {runScheduler} from'./runScheduler.js';

document.getElementById('algorithm').addEventListener('change', function() {
    var quantumGroup = document.getElementById('quantumGroup');
    if (this.value === 'rr') {
        quantumGroup.style.display = 'block';
    } else {
        quantumGroup.style.display = 'none';
    }
});

document.getElementById('runSchedulerButton').addEventListener('click', runScheduler());
