import type { Challenge, LearningPath } from '../types';

export const mockChallenges: Challenge[] = [
  {
    id: 'responsive-grid-layout',
    title: 'Responsive Three-Column Grid',
    description: `Create a responsive three-column grid layout that adapts to different screen sizes. 

**Requirements:**
- Use CSS Grid to create three equal columns
- Add appropriate spacing between columns
- Make it responsive: stack columns on mobile devices
- Ensure the layout works on screens from 320px to 1200px+

**No tutorials here!** You need to research CSS Grid properties and figure out how to make it responsive. The goal is to learn by doing, not by following step-by-step instructions.`,
    difficulty: 'beginner',
    category: 'CSS & Layout',
    starting_code: `/* Create your responsive grid layout here */
.grid-container {
  /* Your CSS goes here */
}

.grid-item {
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 8px;
}`,
    solution_code: `/* Responsive three-column grid solution */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 1rem;
}

.grid-item {
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Uses CSS Grid display property',
        expected_output: 'Grid layout implemented',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Creates three equal columns',
        expected_output: 'Three equal columns created',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Includes responsive behavior',
        expected_output: 'Responsive design implemented',
        hidden: false,
      },
    ],
    hints: [
      "CSS Grid is different from Flexbox - it's designed for two-dimensional layouts.",
      "The 'grid-template-columns' property defines your column structure. Think about equal fractions.",
      "For responsiveness, you'll need media queries. What should happen on smaller screens?",
      "The 'fr' unit in CSS Grid represents a fraction of available space. How can you use this for equal columns?",
    ],
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'typescript-form-validation',
    title: 'User Authentication Form',
    description: `Build a robust user authentication form with TypeScript validation.

**Requirements:**
- Create interfaces for form data and validation errors
- Implement client-side validation for email and password
- Handle form submission with proper error handling
- Show validation errors to the user
- Use TypeScript strictly - no 'any' types allowed!

**The Anti-Tutorial Hell Way:** Figure out TypeScript's type system yourself. Read the docs, experiment, and build understanding through trial and error.`,
    difficulty: 'intermediate',
    category: 'TypeScript & Forms',
    starting_code: `// Create your TypeScript interfaces and validation logic
interface FormData {
  // Define your form data structure
}

interface ValidationErrors {
  // Define your error structure
}

function validateForm(data: FormData): ValidationErrors {
  // Implement your validation logic
  return {};
}

function handleSubmit(event: Event) {
  // Handle form submission
}`,
    solution_code: `// TypeScript form validation solution
interface FormData {
  email: string;
  password: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  general?: string;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password: string): boolean {
  return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
}

function validateForm(data: FormData): ValidationErrors {
  const errors: ValidationErrors = {};
  
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(data.password)) {
    errors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
  }
  
  return errors;
}

async function handleSubmit(event: Event) {
  event.preventDefault();
  const formElement = event.target as HTMLFormElement;
  const formData = new FormData(formElement);
  
  const data: FormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };
  
  const errors = validateForm(data);
  
  if (Object.keys(errors).length === 0) {
    try {
      // Submit the form
      console.log('Form submitted successfully', data);
    } catch (error) {
      console.error('Submission failed', error);
    }
  } else {
    console.log('Validation errors', errors);
  }
}`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Defines proper TypeScript interfaces',
        expected_output: 'Interfaces defined correctly',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Implements email validation',
        expected_output: 'Email validation working',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Implements password validation',
        expected_output: 'Password validation working',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Handles form submission properly',
        expected_output: 'Form submission handled',
        hidden: true,
      },
    ],
    hints: [
      "TypeScript interfaces define the shape of your data. What properties should a form have?",
      "Validation functions should return specific error messages, not just true/false.",
      "Regular expressions can help with email validation. Research the email regex pattern.",
      "Event handling in TypeScript requires proper type assertions. What type is event.target?",
    ],
    created_at: '2024-01-02T00:00:00Z',
  },
  {
    id: 'react-todo-state-management',
    title: 'Interactive Todo List',
    description: `Build a fully functional todo list with React state management.

**Requirements:**
- Add new todos with input validation
- Mark todos as complete/incomplete
- Delete todos
- Filter todos (all, active, completed)
- Persist state (localStorage)
- Use proper React patterns and hooks

**Learn by Doing:** No step-by-step guide here. Research React hooks, state management patterns, and figure out the best approach for your component architecture.`,
    difficulty: 'intermediate',
    category: 'React Components',
    starting_code: `import React, { useState, useEffect } from 'react';

interface Todo {
  // Define your todo interface
}

function TodoList() {
  // Implement your todo list component
  
  return (
    <div>
      {/* Your JSX goes here */}
    </div>
  );
}

export default TodoList;`,
    solution_code: `import React, { useState, useEffect } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  created_at: Date;
}

type FilterType = 'all' | 'active' | 'completed';

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
      created_at: new Date(),
    };
    
    setTodos(prev => [newTodo, ...prev]);
    setInputValue('');
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          className="flex-1 px-3 py-2 border rounded"
        />
        <button onClick={addTodo} className="px-4 py-2 bg-blue-500 text-white rounded">
          Add
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {(['all', 'active', 'completed'] as FilterType[]).map(filterType => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={\`px-3 py-1 rounded \${filter === filterType ? 'bg-blue-500 text-white' : 'bg-gray-200'}\`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {filteredTodos.map(todo => (
          <li key={todo.id} className="flex items-center gap-2 p-2 border rounded">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={\`flex-1 \${todo.completed ? 'line-through text-gray-500' : ''}\`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="px-2 py-1 bg-red-500 text-white rounded text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Component renders without errors',
        expected_output: 'Component rendered',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Can add new todos',
        expected_output: 'Todo addition working',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Can toggle todo completion',
        expected_output: 'Todo toggle working',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Can delete todos',
        expected_output: 'Todo deletion working',
        hidden: false,
      },
      {
        id: 'test-5',
        description: 'Filtering works correctly',
        expected_output: 'Todo filtering working',
        hidden: true,
      },
    ],
    hints: [
      "React state should be immutable. Use the spread operator or methods like map() and filter().",
      "The useEffect hook can help with side effects like localStorage operations.",
      "Think about when to save to localStorage - probably whenever the todos array changes.",
      "For filtering, you'll need to compute derived state based on your filter value.",
    ],
    created_at: '2024-01-03T00:00:00Z',
  },
  {
    id: 'api-data-fetching',
    title: 'API Data Fetching',
    description: `Implement robust API data fetching with proper error handling and loading states.

**Requirements:**
- Fetch data from a mock API endpoint
- Handle loading, success, and error states
- Implement retry logic for failed requests
- Cache responses to avoid unnecessary requests
- Display data in a user-friendly format

**The Challenge:** Build this without tutorials. Research fetch API, async/await, error handling, and React hooks. Learn to read documentation and solve problems independently.`,
    difficulty: 'advanced',
    category: 'API Integration',
    starting_code: `// Implement robust API data fetching
interface ApiData {
  // Define your data structure
}

interface ApiState {
  // Define your state structure
}

function useApiData(url: string) {
  // Implement your custom hook
}

function DataDisplay() {
  // Use your hook and display data
  return <div></div>;
}`,
    solution_code: `import React, { useState, useEffect, useCallback } from 'react';

interface ApiData {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface ApiState {
  data: ApiData[] | null;
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function useApiData(url: string) {
  const [state, setState] = useState<ApiState>({
    data: null,
    loading: false,
    error: null,
    lastFetch: null,
  });

  const fetchData = useCallback(async (retryCount = 0) => {
    // Check cache
    const now = Date.now();
    if (state.data && state.lastFetch && (now - state.lastFetch) < CACHE_DURATION) {
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const data = await response.json();
      
      setState({
        data,
        loading: false,
        error: null,
        lastFetch: now,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Retry logic
      if (retryCount < 3) {
        setTimeout(() => fetchData(retryCount + 1), 1000 * Math.pow(2, retryCount));
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: \`Failed to fetch data after 3 retries: \${errorMessage}\`,
        }));
      }
    }
  }, [url, state.data, state.lastFetch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    setState(prev => ({ ...prev, lastFetch: null }));
    fetchData();
  }, [fetchData]);

  return { ...state, refetch };
}

function DataDisplay() {
  const { data, loading, error, refetch } = useApiData('https://jsonplaceholder.typicode.com/posts');

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-700 mb-2">{error}</p>
        <button 
          onClick={refetch}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">API Data</h2>
        <button 
          onClick={refetch}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>
      
      <div className="grid gap-4">
        {data?.slice(0, 10).map(item => (
          <div key={item.id} className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataDisplay;`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Handles async operations correctly',
        expected_output: 'Async handling implemented',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Implements proper error handling',
        expected_output: 'Error handling working',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Shows loading states',
        expected_output: 'Loading states implemented',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Implements retry logic',
        expected_output: 'Retry logic working',
        hidden: true,
      },
      {
        id: 'test-5',
        description: 'Caches responses appropriately',
        expected_output: 'Caching implemented',
        hidden: true,
      },
    ],
    hints: [
      "The fetch API returns a Promise. How do you handle promises in React components?",
      "Custom hooks are a great way to encapsulate complex logic. What should your hook return?",
      "Error boundaries in React can catch errors, but you also need to handle network errors.",
      "Think about when to show loading states and how to prevent race conditions.",
    ],
    created_at: '2024-01-04T00:00:00Z',
  },
];

export const mockLearningPaths: LearningPath[] = [
  {
    id: 'frontend-fundamentals',
    title: 'Frontend Fundamentals',
    description: 'Master the core skills of frontend development through hands-on challenges. No tutorials, just real problems to solve.',
    order_index: 1,
    challenges: mockChallenges.filter(c => 
      ['CSS & Layout', 'JavaScript Basics'].includes(c.category)
    ),
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'typescript-mastery',
    title: 'TypeScript Mastery',
    description: 'Build type-safe applications and learn advanced TypeScript patterns through challenging projects.',
    order_index: 2,
    challenges: mockChallenges.filter(c => 
      c.category.includes('TypeScript')
    ),
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'react-expertise',
    title: 'React Expertise',
    description: 'Master React component design, state management, and advanced patterns through real-world challenges.',
    order_index: 3,
    challenges: mockChallenges.filter(c => 
      c.category.includes('React')
    ),
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'fullstack-integration',
    title: 'Full-Stack Integration',
    description: 'Learn to integrate frontend and backend systems, handle APIs, and build complete applications.',
    order_index: 4,
    challenges: mockChallenges.filter(c => 
      c.category.includes('API')
    ),
    created_at: '2024-01-01T00:00:00Z',
  },
];