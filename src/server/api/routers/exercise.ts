import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exerciseRouter = createTRPCRouter({
  
  // Create
  createExercise: protectedProcedure
  .input(z.object({ 
    name: z.string(),
    sets: z.number(),
    reps: z.number(),
    weight: z.number(),
    workoutId: z.number(),
  }))
  .mutation(({ ctx, input }) => {
    return ctx.prisma.exercise.create({data: input})
  }),

  // Read
  getExercises: protectedProcedure
    .query(({ ctx }) => {
      return ctx.prisma.exercise.findMany();
    }),

  // Update
  updateExercise: protectedProcedure
  .input(z.object({ 
    id: z.number(),
    name: z.string().optional(),
    sets: z.number().optional(),
    reps: z.number().optional(),
    weight: z.number().optional(),
  }))
  .mutation(({ ctx, input }) => {
    const {id, ...data} = input;
    return ctx.prisma.exercise.update({where: { id }, data})
  }),

  // Delete
  deleteExercise: protectedProcedure
  .input(z.number())
  .mutation(({ ctx, input }) => {
    return ctx.prisma.exercise.delete({where: { id: input }})
  }),

});
