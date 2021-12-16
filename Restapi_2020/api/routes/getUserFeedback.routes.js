const getUserFeedbackController = require("../controllers/getUserFeedback.controller");
const Authorized = require("../middlewares/check.auth");
const getfeedbackRoutes = (app) => {
/**
* Date: 15.12.2021
* Author: TTIPL
* Description: List a single User Feedback
*/
/**
* @swagger
* /api/getuserfeedback/{id}:
*   get:
*     tags:
*       - User
*     summary: Get a single User Feedback
*     description: List a single user based on the user id
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
app.get("/api/getuserfeedback/:id", getUserFeedbackController.getfeedback);
};
module.exports = getfeedbackRoutes;