import { Request, Response } from "express";
import { TodoModel } from "../models/todoModel";
import { ToDoItem } from "../types";

export class TodoController {
  // GET /api/todos
  static getAllTodos = async (req: Request, res: Response) => {
    try {
      const todos = await TodoModel.getAll();
      res.json(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  // GET /api/todos/:id
  static getTodoById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const todo = await TodoModel.getById(id);

      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      res.json(todo);
    } catch (error) {
      console.error("Error fetching todo:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  // POST /api/todos
  static createTodo = async (req: Request, res: Response) => {
    try {
      const { title, description, isImportant } = req.body;

      // Validation
      if (!title || typeof title !== "string") {
        return res
          .status(400)
          .json({ error: "Title is required and must be a string" });
      }

      if (typeof isImportant !== "boolean") {
        return res.status(400).json({ error: "isImportant must be a boolean" });
      }

      const newTodo = await TodoModel.create({
        title,
        description,
        isImportant,
      });

      res.status(201).json(newTodo);
    } catch (error) {
      console.error("Error creating todo:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  // PUT /api/todos/:id
  static updateTodo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, isImportant } = req.body;

      // Validation
      const updates: Partial<Omit<ToDoItem, "id">> = {};

      if (title !== undefined) {
        if (typeof title !== "string") {
          return res.status(400).json({ error: "Title must be a string" });
        }
        updates.title = title;
      }

      if (description !== undefined) {
        updates.description = description;
      }

      if (isImportant !== undefined) {
        if (typeof isImportant !== "boolean") {
          return res
            .status(400)
            .json({ error: "isImportant must be a boolean" });
        }
        updates.isImportant = isImportant;
      }

      const updatedTodo = await TodoModel.update(id, updates);

      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      res.json(updatedTodo);
    } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  // DELETE /api/todos/:id
  static deleteTodo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await TodoModel.delete(id);

      if (!deleted) {
        return res.status(404).json({ error: "Todo not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting todo:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
