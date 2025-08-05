# mindmap-todo-api

A simple backend for [mindmap-todo-frontend](https://github.com/cooljasonmelton/mindmap-todo-frontend)

## BUILT WITH

- Node.js
- Express
- RESTful routes
- CRUD operations
- SQLite database

## MODEL

```typescript
type ToDoItem = {
  id: string;
  title: string;
  description?: string;
  isImportant: boolean;
};
```

## ROUTES

|                      |                                     |
| -------------------- | ----------------------------------- |
| POST (create)        | http://localhost:8000/api/todos     |
| GET (read all)       | http://localhost:8000/api/todos     |
| GET (read by id)     | http://localhost:8000/api/todos/:id |
| PUT (update todo)    | http://localhost:8000/api/todos/:id |
| DELETE (delete todo) | http://localhost:8000/api/todos/:id |

## LOCAL SET UP

1. clone repo
2. When running with [mindmap-todo-frontend](https://github.com/cooljasonmelton/mindmap-todo-frontend) To not create an .env file in the root and add the following

```
PORT=8000
```

3. to run locally:

```
npm run dev
```

<hr/>

Created by
<a href='https://github.com/cooljasonmelton'> Jason Melton</a>

<hr/>
<br/>
<br/>
<br/>
<br/>

## TODO LATER:

- error handling & validation
  - Research Error handling:
  - Global error handling middleware
  - Input validation (consider adding joi or express-validator)
  - Proper HTTP status codes
- testing
- complete documentation
