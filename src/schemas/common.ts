import { z } from 'zod';

export const stringifiedIntegerSchema = z.string().transform((value) => {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
        return parsedValue;
    }
    throw new Error("Invalid number format");
});