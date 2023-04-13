import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const workoutRouter = createTRPCRouter({
  
  // Create
  createExercise: protectedProcedure
  .input(z.object({ 
    date: z.string(),
    userId: z.number()
  }))
  .mutation(({ ctx, input }) => {
    return ctx.prisma.workout.create({data: input})
  }),

  // Read
  getExercises: protectedProcedure
    .query(({ ctx }) => {
      return ctx.prisma.workout.findMany({include: {exercises: true}});
    }),

  // Update
  updateExercise: protectedProcedure
  .input(z.object({ 
    id: z.number(),
    date: z.string().optional(),
  }))
  .mutation(({ ctx, input }) => {
    const {id, ...data} = input;
    return ctx.prisma.workout.update({where: { id }, data})
  }),

  // Delete
  deleteExercise: protectedProcedure
  .input(z.number())
  .mutation(({ ctx, input }) => {
    return ctx.prisma.workout.delete({where: { id: input }})
  }),

});
