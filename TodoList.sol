pragma solidity ^0.8.0;

contract TodoList {
    uint public taskCount = 0; // Task counter

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    mapping(uint => Task) public tasks;

    // Event to notify task creation
    event TaskCreated(
        uint id,
        string content,
        bool completed
    );

    // Event to notify task completion
    event TaskCompleted(
        uint id,
        bool completed
    );

    // Create a new task
    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
    }

    // Mark a task as completed
    function completeTask(uint _id) public {
        Task memory task = tasks[_id];
        task.completed = true;
        tasks[_id] = task;
        emit TaskCompleted(_id, true);
    }
}
