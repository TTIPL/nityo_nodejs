const jwt = require("jsonwebtoken");
const Log = require("../utils/logger").log;
const express = require("express");
const app = express();
const amqp = require("amqplib");
const bp = require("body-parser");
var channel, connection;
app.use(bp.json());
connect();

const Feedbacksession = "feedbacksession";

// connect rabbitmq

async function connect() {
try {
const amqpServer = process.env.RABBITMQ_PORT;
connection = await amqp.connect(amqpServer);
channel = await connection.createChannel();
await channel.assertQueue(Feedbacksession);
} catch (ex) {
console.error(ex);
}
}

async function createfeedback_session(feedbacks) {
await channel.sendToQueue(Feedbacksession, Buffer.from(JSON.stringify(feedbacks),{persistent: true}));
};


/**
 * Date: 14-12-2021
 * Author: TTIPL
 * Description: Create a new feedback
 */

const sendfeedback = async (request, response) => {
try {
const feedbacks  = request.body;
var name= request.body.name;
var email=request.body.email;
var feedback=request.body.feedback;
var subject=request.body.subject;
var userid=request.body.userid
if(
name === "" ||
name === null ||
email === "" ||
email === null ||
feedback === "" ||
feedback === null ||
subject === "" ||
subject === null ||
userid === "" ||
userid === null
){
return response
.status(200)
.send({ status: 400, message: "Enter all required values" });
}
const validate_email = email;
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
if(emailRegexp.test(validate_email)){
}
else{
return response
.status(200)
.send({ status: 400, message: "Enter valid email address" });
}
await  createfeedback_session(feedbacks);
response.status(200).send({ status: 200, message: "Feedback Send Successfully" });
} catch (error) {
Log.error(
"{ controller: user, method:sendfeedback, type: Exception, status: 400, error: " +
error +
" }"
);
response.status(400).send({ status: 400, message: error });
}
}



module.exports = {
sendfeedback,
};