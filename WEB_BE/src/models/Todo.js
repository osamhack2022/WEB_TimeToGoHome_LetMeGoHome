/**
 * @swagger
 *   components:
 *     schemas:
 *       Todo:
 *         type: object
 *         required:
 *           - user_id
 *           - goal
 *           - start
 *           - end
 *         properties:
 *           id:
 *             type: integer
 *             minimum: 0
 *             description: todo_id granted by the server
 *           user_id:
 *             type: integer
 *             minimum: 0
 *             description: todo owner's id
 *           goal:
 *             type: string
 *             description: goal of the todo list
 *           duration:
 *             type: integer
 *             description: "duration of the todo list (unit: week)"
 *           start:
 *             type: string
 *             foramt: date
 *             description: start date of the todo list
 *           end:
 *             type: string
 *             foramt: date
 *             description: end date of the todo list
 *           is_done:
 *             type: boolean
 *             description: flag indicating whether the todo list is closed
 *           is_shared:
 *             type: boolean
 *             description: flag indicating whether the todo list is shared
 *         example:
 *           id: 1732
 *           user_id: 947
 *           goal: 3대 300 만들기
 *           duration: 12
 *           start: 2022-08-19
 *           end: 2022-11-10
 *           is_done: false
 *           is_shared: false
 */
