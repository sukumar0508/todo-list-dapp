// Connect to MetaMask (Ethereum provider)
if (typeof window.ethereum !== 'undefined') {
    window.web3 = new Web3(window.ethereum);
    ethereum.request({ method: 'eth_requestAccounts' })
    .then(accounts => {
        console.log('Connected to MetaMask:', accounts[0]);
        loadTasks(); // Load tasks on startup
    })
    .catch(error => {
        console.log('Error connecting to MetaMask:', error);
    });
} else {
    alert('Please install MetaMask!');
}

// Smart contract ABI and address
const contractABI = [
    // Your ABI here
];
const contractAddress = '0xf1a27C79227eA25B10BEa4E24A84A46feFF5B77A'; // Replace with your actual contract address

// Get the contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to create a new task
async function createTask() {
    const task = document.getElementById('newTask').value;
    if (!task) {
        alert('Please enter a task.');
        return;
    }

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    try {
        // Send transaction to add task
        await contract.methods.addTask(task).send({ from: account });
        console.log('Task added:', task);
        
        // Reload tasks after adding
        loadTasks();
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

// Function to load tasks from the blockchain
async function loadTasks() {
    try {
        const tasksCount = await contract.methods.taskCount().call();
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; // Clear the existing task list

        for (let i = 0; i < tasksCount; i++) {
            const task = await contract.methods.tasks(i).call();
            const listItem = document.createElement('li');
            listItem.textContent = task;
            taskList.appendChild(listItem);
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}
