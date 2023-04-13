import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const workoutRouter = createTRPCRouter({
  
  // Create
  createWorkout: protectedProcedure
  .input(z.object({ 
    date: z.date(),
    userId: z.number()
  }))
  .mutation(({ ctx, input }) => {
    return ctx.prisma.workout.create({data: input})
  }),

  // Read
  getWorkout: protectedProcedure
    .query(({ ctx }) => {
      return ctx.prisma.workout.findMany({include: {exercises: true}});
    }),

  // Update
  updateWorkout: protectedProcedure
  .input(z.object({ 
    id: z.number(),
    date: z.date().optional(),
  }))
  .mutation(({ ctx, input }) => {
    const {id, ...data} = input;
    return ctx.prisma.workout.update({where: { id }, data})
  }),

  // Delete
  deleteWorkout: protectedProcedure
  .input(z.number())
  .mutation(({ ctx, input }) => {
    return ctx.prisma.workout.delete({where: { id: input }})
  }),

});
