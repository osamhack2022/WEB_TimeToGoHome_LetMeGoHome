/**
 * @swagger
 *   components:
 *     schemas:
 *       Task:
 *         type: object
 *         required:
 *           - todo_id
 *           - content
 *           - datetime
 *         properties:
 *           id:
 *             type: integer
 *             minimum: 0
 *             description: task_id granted by the server
 *           todo_id:
 *             type: integer
 *             minimum: 0
 *             description: id of the todo list containing the task
 *           content:
 *             type: string
 *             description: content of the task
 *           datetime:
 *             type: string
 *             foramt: date-time
 *             description: date and time of the task
 *           is_done:
 *             type: boolean
 *             description: flag indicating whether the task is done
 *         example:
 *           id: 15639
 *           todo_id: 1732
 *           content: 덤벨 프레스 5set
 *           datetime: 2022-09-27T18:00:00Z
 *           is_done: true
 */
