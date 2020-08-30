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

      getTodoById: (
        { params, response }: { params: { id: string }; response: any },
      ) => {
        const todo: Todo | undefined = todos.find((t) => t.id === params.id);
        if (!todo) {
          response.status = 404;
          response.body = {
            success: false,
            message: "No todo found",
          };
          return;
        }
    
        // If todo is found
        response.status = 200;
        response.body = {
          success: true,
          data: todo,
        };
      },
      updateTodoById: async (
        { params, request, response }: {
          params: { id: string },
          request: any,
          response: any,
        },
      ) => {
        const todo: Todo | undefined = todos.find((t) => t.id === params.id);
        if (!todo) {
          response.status = 404;
          response.body = {
            success: false,
            message: "No todo found",
          };
          return;
        }
    
        // if todo found then update todo
        const body = await request.body().value;
        const updatedData: { todo?: string; isCompleted?: boolean } = body;
        let newTodos = todos.map((t) => {
          return t.id === params.id ? { ...t, ...updatedData } : t;
        });
        response.status = 200;
        response.body = {
          success: true,
          data: newTodos,
        };
      },
      /**
       * @description Delete todo by id
       * @route DELETE todos/:id
       */
      deleteTodoById: (
        { params, response }: { params: { id: string }; response: any },
      ) => {
        const allTodos = todos.filter((t) => t.id !== params.id);
    
        // remove the todo w.r.t id & return
        // remaining todos
        response.status = 200;
        response.body = {
          success: true,
          data: allTodos,
        };
      },
    };