/**
 * @swagger
 *   components:
 *     schemas:
 *       User:
 *         type: object
 *         required:
 *           - name
 *           - army_type
 *           - army_rank
 *           - enlistment
 *         properties:
 *           id:
 *             type: integer
 *             minimum: 0
 *             description: user_id granted by the server
 *           name:
 *             type: string
 *             description: nickname
 *           email:
 *             type: string
 *             format: email
 *             pattern: ^[A-Za-z0-9\.\-\_]+@[A-Za-z]+\.[A-Za-z]{2,4}$
 *             description: email address, needs to be unique
 *           password:
 *             type: string
 *             format: password
 *             description: password
 *           army_type:
 *             type: string
 *             description: one of [육군, 해군, 공군]
 *           army_rank:
 *             type: string
 *             description: one of [이병, 일병, 상병, 병장]
 *           enlistment:
 *             type: string
 *             format: date
 *             description: enlistment date
 *           discharge:
 *             type: string
 *             format: date
 *             description: discharge date
 *         example:
 *           id: 0
 *           name: 김공군
 *           email: kim.af@naver.com
 *           password: test1234
 *           army_type: 공군
 *           army_rank: 상병
 *           enlistment: 2022-01-10
 *           discharge: 2023-10-09
 */
