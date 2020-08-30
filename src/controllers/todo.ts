import { v4 } from "https://deno.land/std/uuid/mod.ts";
import Todo from "../interfaces/Todo.ts";
import todos from "../stubs/todos.ts";

export default {
    getAllTodos: ({ response }: { response: any }) => {
        response.status = 200;
        response.body = {
            success: true,
            data: todos,
    };
    },
    
    createTodo: async (ctx: any) => {
        const body = await ctx.request.body().value;

        if (!ctx.request.hasBody) {
            ctx.response.status = 400;
            ctx.response.body = {
            success: false,
            message: "No data provided",
          };
          return;
        }

        let newTodo: Todo = {
          id: v4.generate(),
          todo: body.todo,
          isCompleted: false,
        };
        let data = [...todos, newTodo];
        ctx.response.body = {
          success: true,
          data,
        };
      },

    getTodoById: () => {},
    updateTodoById: async () => {},
    deleteTodoById: () => {},
  };