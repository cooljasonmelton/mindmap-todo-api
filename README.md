# mindmap-todo-api

A Node.js, RESTful CRUD api for [mindmap-todo-frontend](https://github.com/cooljasonmelton/mindmap-todo-frontend)

## MODEL

```typescript
type ToDoItem = {
  id: string;
  title: string;
  description?: string;
  isImportant: boolean;
};
```

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

## TODO LATER:

- error handling & validation
  - Research Error handling:
  - Global error handling middleware
  - Input validation (consider adding joi or express-validator)
  - Proper HTTP status codes
- testing
- complete documentation
