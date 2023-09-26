import express, { Request, Response } from 'express';
import { createSchema } from '../schemas/tasks/create';
import { updateSchema } from '../schemas/tasks/update';
import { stringifiedIntegerSchema } from '../schemas/common';
import { Task } from '../models/Task';
import { z } from 'zod';
import { GetResponse, TaskResponse } from '@/types/task';
import { ErrorResponse } from '@/types/common';


export const router = express.Router();

// Create a task
router.post('/', async (req: Request, res: Response<TaskResponse | ErrorResponse>) => {
  try {
    const taskDetail = createSchema.parse(req.body);
    const task = await Task.create(taskDetail);
    return res.status(200).json(toTaskResponse(task));
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Invalid request data", details: JSON.stringify(error.issues) });
    } else {
      res.status(500).json({ error: "Internal server error", details: "Something Went Wrong" });
    }
  }
});

// Update a task by ID
router.put('/:taskId', async (req: Request, res: Response<TaskResponse | ErrorResponse>) => {
  try {
    const taskId = stringifiedIntegerSchema.parse(req.params.taskId);
    const updateTask = updateSchema.parse(req.body);
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found', details: "Bad Request" });
    }
    await task.update(updateTask);
    return res.status(200).json(toTaskResponse(task));
  } catch (error) {
    return res.status(500).json({ error: "Internal server error", details: "Something Went Wrong" });
  }
});

// Get all tasks (paginated)
router.get('/', async (req: Request, res: Response<GetResponse | ErrorResponse>) => {
  const page = stringifiedIntegerSchema.parse(req.query.page || "1");
  const pageSize = stringifiedIntegerSchema.parse(req.query.pageSize || "10");
  const taskCount = await Task.count();
  // Return error response when the asked page is out of bound
  const prevLink = createGetTaskLink((page - 1), pageSize, taskCount);
  const nextLink = createGetTaskLink((page + 1), pageSize, taskCount);
  try {
    const tasks = await Task.findAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
    const tasksResponse: TaskResponse[] = tasks.map((task) => { return toTaskResponse(task) });
    return res.status(200).json({
      prev: prevLink,
      next: nextLink,
      data: tasksResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve tasks', details: "Internal Server Error" });
  }
});

// Update the host based on env
function createGetTaskLink(page: number, pageSize: number, totalCount: number): string | null {
  if (((page - 1) * pageSize >= totalCount) || page < 1) return null;
  return "http://localhost:3000/tasks?page=" + page.toString() + "&pageSize=" + pageSize;
}

function toTaskResponse(task: any): TaskResponse {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    createdAt: task.createdAt,
  }
}