import { Status } from '../../types/common';
import { z } from 'zod';

export const updateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.nativeEnum(Status).optional(),
})