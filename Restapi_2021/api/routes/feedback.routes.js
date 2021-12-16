const feedbackController = require("../controllers/feedback.controller");
const feedbackRoutes = (app) => {
/**
* Date: 15.12.2021
* Author: TTIPL
* Description: Create a new user
*/
/**
* @swagger
* definitions:
*   User:
*     properties:
*       email:
*         type: string
*       name:
*         type: string
*       feedback:
*         type: string
*       subject:
*          type: string
*       userId:
*          type: string
*/
/**
* @swagger
* /api/user/create:
*   post:
*     tags:
*       - User
*     summary: Create a new user
*     description: Create a new user
*     produces:
*       - application/json
*     parameters:
*       - name: user
*         description: User object
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/User'
*     responses:
*       201:
*         description: Successfully created
*       400:
*         description: Bad request
*       401:
*         description: Unauthorized access
*       404:
*         description: API not found
*       500:
*         description: Internal server error
*/
app.post("/api/feedback/sendfeedback", feedbackController.sendfeedback);
};
module.exports = feedbackRoutes;