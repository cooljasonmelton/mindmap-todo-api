import { ToDoItem } from "../types";
import { getDatabase } from "../database/database";

export class TodoModel {
  static async getAll(): Promise<ToDoItem[]> {
    const db = await getDatabase();
    const rows = await db.all(`
      SELECT id, title, description, isImportant 
      FROM todos 
      ORDER BY createdAt DESC
    `);

    return rows.map((row) => ({
      id: row.id.toString(),
      title: row.title,
      description: row.description,
      isImportant: Boolean(row.isImportant),
    }));
  }

  static async getById(id: string): Promise<ToDoItem | null> {
    const db = await getDatabase();
    const row = await db.get(
      `
      SELECT id, title, description, isImportant 
      FROM todos 
      WHERE id = ?
    `,
      [id]
    );

    if (!row) return null;

    return {
      id: row.id.toString(),
      title: row.title,
      description: row.description,
      isImportant: Boolean(row.isImportant),
    };
  }

  static async create(todoData: Omit<ToDoItem, "id">): Promise<ToDoItem> {
    const db = await getDatabase();
    const result = await db.run(
      `
      INSERT INTO todos (title, description, isImportant)
      VALUES (?, ?, ?)
    `,
      [todoData.title, todoData.description, todoData.isImportant ? 1 : 0]
    );

    if (!result.lastID) {
      throw new Error("Failed to create todo");
    }

    return {
      id: result.lastID.toString(),
      ...todoData,
    };
  }

  static async update(
    id: string,
    updates: Partial<Omit<ToDoItem, "id">>
  ): Promise<ToDoItem | null> {
    const db = await getDatabase();

    // Build dynamic UPDATE query
    const updateFields: string[] = [];
    const values: any[] = [];

    if (updates.title !== undefined) {
      updateFields.push("title = ?");
      values.push(updates.title);
    }

    if (updates.description !== undefined) {
      updateFields.push("description = ?");
      values.push(updates.description);
    }

    if (updates.isImportant !== undefined) {
      updateFields.push("isImportant = ?");
      values.push(updates.isImportant ? 1 : 0);
    }

    if (updateFields.length === 0) {
      // No updates to make, return current todo
      return await this.getById(id);
    }

    updateFields.push("updatedAt = CURRENT_TIMESTAMP");
    values.push(id);

    const result = await db.run(
      `
      UPDATE todos 
      SET ${updateFields.join(", ")} 
      WHERE id = ?
    `,
      values
    );

    if (result.changes === 0) {
      return null; // Todo not found
    }

    return await this.getById(id);
  }

  static async delete(id: string): Promise<boolean> {
    const db = await getDatabase();
    const result = await db.run(
      `
      DELETE FROM todos 
      WHERE id = ?
    `,
      [id]
    );

    return result.changes! > 0;
  }
}
