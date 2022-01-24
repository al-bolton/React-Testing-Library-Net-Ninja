import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Todo from '../Todo';

const MockedTodo = () => {
  return (
    <BrowserRouter>
      <Todo />
    </BrowserRouter>
  )
}

const addTasks = (tasks) => {
  const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
  const buttonElement = screen.getByRole('button', { name: /Add/i });
  tasks.forEach(task => {
    fireEvent.change(inputElement, { target: { value: task } });
    fireEvent.click(buttonElement);
  })
}

describe('Todo', () => {
  it('should add a task to the task list when the task is submitted', () => {
    render(<MockedTodo />);
    addTasks(['Go Grocery Shopping'])
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    expect(divElement).toBeInTheDocument();
  });

  it('should add multiple tasks to the list when they are submitted', () => {
    render(<MockedTodo />);
    addTasks(['Go Grocery Shopping', 'Pet My Cat', 'Wash my hands'])
    const divElements = screen.getAllByTestId("task-container");
    expect(divElements.length).toBe(3);
  });

  it('should render tasks without the completed class when initially rendered', () => {
    render(<MockedTodo />);
    addTasks(['Go Grocery Shopping'])
    const divElement = screen.getByText(/Go Grocery SHopping/i);
    expect(divElement).not.toHaveClass('todo-item-active');
  });

  it('should render tasks with the completed class when clicked', () => {
    render(<MockedTodo />);
    addTasks(['Go Grocery Shopping'])
    const divElement = screen.getByText(/Go Grocery SHopping/i);
    fireEvent.click(divElement);
    expect(divElement).toHaveClass('todo-item-active');
  });
})