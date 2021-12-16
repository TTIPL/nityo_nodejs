const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Log = require("../utils/logger").log;
const express = require("express");
const app = express();
const amqp = require("amqplib");
const bp = require("body-parser");
var channel, connection;
app.use(bp.json());
connect();

const Usersession = "usersession";

// connect rabbitmq

async function connect() {
try {
const amqpServer = process.env.RABBITMQ_PORT;
connection = await amqp.connect(amqpServer);
channel = await connection.createChannel();
await channel.assertQueue(Usersession);
} catch (ex) {
console.error(ex);
}
}

async function createSession(user) {
await channel.sendToQueue(Usersession, Buffer.from(JSON.stringify(user),{persistent: true}));
};

/**
* Date: 14-12-2021
* Author: TTIPL
* Description: Create a new user
*/

const createUser = async (request, response) => {
try {
let name = request.body.name;
let email = request.body.email;
let password = request.body.password;
let phone_number = request.body.phone_number;
let address = request.body.address;
if (
name === "" ||
name === null ||
email === "" ||
email === null ||
password === "" ||
password === null ||
phone_number === "" ||
phone_number === null ||
address === "" ||
address === null
) {
return response
.status(200)
.send({ status: 400, message: "Enter all required values" });
}
const emailToValidate = email;
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
if(emailRegexp.test(emailToValidate)){
}
else{
return response
.status(200)
.send({ status: 400, message: "Enter valid email address" });
}
const user_object_data  = request.body;
await createSession(user_object_data);
return response.status(200).send({ status: 200, message: "Succesfully Registered" });
} catch (error) {
Log.error(
"{ controller: user, method: createUser, type: Exception, status: 400, error: " +
error +
" }"
);
response.status(400).send({ status: 400, message: error });
}
};



module.exports = {
createUser,
};