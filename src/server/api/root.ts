import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { exerciseRouter } from './routers/exercise';
import { workoutRouter } from './routers/workout';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  exercise: exerciseRouter,
  workout: workoutRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
