import React, { useState, useEffect } from 'react';
import './Task.scss';
import data from '../data/tasks.json';

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [taskField, setTaskField] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskField.trim() === '') {
      setErrorMessage('Task field cannot be empty');

      setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return;
    }

    const record = {
      id: tasks.length + 1,
      name: taskField,
      completed: false,
    };

    setTasks([...tasks, record]);

    setTaskField('');
  };

  const handleChange = (e) => {
    setTaskField(e.target.value);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const taskId = parseInt(e.target.id);

    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleCheckbox = (e) => {
    // console.log(e.target.id);
    const taskId = parseInt(e.target.id);
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  };

  useEffect(() => {
    setTasks(data);
  }, []);

  return (
    <div className='task'>
      <h2>Task Manager</h2>

      <section className='task__list'>
        {tasks.map((task) => (
          <div key={task.id}>
            <input
              onChange={handleCheckbox}
              type='checkbox'
              checked={task.completed}
              id={task.id}
            />{' '}
            <label className={task.completed ? 'task__done' : ''}>
              {task.name}
            </label>
            <a
              href=''
              onClick={handleDelete}
              id={task.id}
              className='task__delete'
            >
              Delete{' '}
            </a>
          </div>
        ))}
      </section>

      {errorMessage && <div className='task__error'>{errorMessage}</div>}
      <form onSubmit={handleSubmit} className='task__form'>
        <input
          name='task'
          value={taskField}
          onChange={handleChange}
          type='text'
        />
        <button>Save</button>
      </form>
    </div>
  );
}
