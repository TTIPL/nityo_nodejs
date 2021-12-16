const jwt = require("jsonwebtoken");
const Log = require("../utils/logger").log;
const dbConn = require("../sqlConnection");
const express = require("express");
const app = express();
const amqp = require("amqplib");
const bp = require("body-parser");
var channel, connection;
connect();

const Feedbacksession = "feedbacksession";

//connect rabbitmq and get data

async function connect() {
try {
const amqpServer = process.env.RABBITMQ_PORT;
connection = await amqp.connect(amqpServer);
channel = await connection.createChannel();
await channel.assertQueue(Feedbacksession);
channel.consume(Feedbacksession, data => {
let objectfeedback = JSON.parse(Buffer.from(data.content));
feedback_session(objectfeedback);
channel.ack(data);
});
} catch (ex) {
console.error(ex);
}
}


/**
* Date: 14.12.2021
* Author: TTIPL
* Description: Create a new feedback rabbitmq session data
*/


const feedback_session = async objectFeedback => {
try{
let insertquery = "";
let feedback_data ={
email: objectFeedback.email,
name: objectFeedback.name,
subject:objectFeedback.subject,
feedback:objectFeedback.feedback,
userid:objectFeedback.userid,
created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
}
let converted_string = JSON.stringify(feedback_data);
const feedbackinsert_id = await new Promise(function (resolve, reject) {
insertquery =
"INSERT INTO feedback (feedback) VALUES (?)";
dbConn.query(insertquery,[converted_string],
(err, result) => {
if (err) {
return response
.status(400)
.send({ status: 400, message: "Something Went Wrong." });
}
resolve(result.insertId);
}
);
});

let audit_table_name = "feedback";
let creation_meg = "feedback created successfully";
let created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

    const audit_logs = await new Promise(function (resolve, reject) {
    sqlQuery =
    "INSERT INTO audit_logs (audit_table_name,audit_table_id,audit_action,description,action_date_time) VALUES (?,?,?,?,?)";
    dbConn.query(sqlQuery,[audit_table_name,feedbackinsert_id,creation_meg,creation_meg,created_at],
    (err, result) => {
    if (err) {
    let error_meg = { status: 400,message: "Something Went Wrong."};
    return error_meg;
    }
    resolve(result);
    }
    );
    });
    Log.info(
      "{ controller: feedback, method: feedback_session, type: audit_log, status: 200, audit_table_id: " +
      feedbackinsert_id +
          " }"
          );
let success_msg = { status: 200, message: true,Data: feedbackinsert_id};
console.log(success_msg);
return success_msg;
}
catch (error) {
Log.error(
"{ controller: feedback, method: feedback_session, type: Exception, status: 400, error: " +
error +
" }"
);
}
};


/**
* Date: 14.12.2021
* Author: TTIPL
* Description: Create a new feedback
*/

const sendfeedback = async (request, response) => {
try {
console.log(data);
} catch (error) {
Log.error(
"{ controller: feedback, method: sendfeedback, type: Exception, status: 400, error: " +
error +
" }"
);
response.status(400).send({ Status: 400, message: error });
}
};

module.exports = {
sendfeedback
};