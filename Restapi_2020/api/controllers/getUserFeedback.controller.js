const jwt = require("jsonwebtoken");
const Log = require("../utils/logger").log;
const dbConn = require("../sqlConnection");
/**
* Date: 14.12.2021
* Author: TTIPL
* Description: Get feedback data
*/
const getfeedback = async (request, response) => {
try {
const getuserfeedbackID = request.params.id;
if (
getuserfeedbackID === "" ||
getuserfeedbackID === null 
) {
return response
.status(200)
.send({ status: 400, message: "Enter the user id" });
}
const getuserfeedback = await new Promise(function (resolve, reject) {
sqlQuery =
"SELECT * FROM feedback WHERE JSON_UNQUOTE(JSON_EXTRACT(feedback, '$.userid')) = ?";
dbConn.query(sqlQuery, [getuserfeedbackID], (err, result) => {
if (err) {
return response
.status(400)
.send({ status: 400, message: "Something Went Wrong." });
}
resolve(result);
});
});

let audit_table_name = "feedback";
let creation_meg = "user feedback get successfully";
let created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

    const audit_logs = await new Promise(function (resolve, reject) {
    sqlQuery =
    "INSERT INTO audit_logs (audit_table_name,audit_table_id,audit_action,description,action_date_time) VALUES (?,?,?,?,?)";
    dbConn.query(sqlQuery,[audit_table_name,getuserfeedbackID,creation_meg,creation_meg,created_at],
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
      "{ controller: getuserfeedback, method: getfeedback, type: audit_log, status: 200, audit_table_id: " +
      getuserfeedbackID +
      " }"
      );

response.status(200).send({ status: 200,data: getuserfeedback });
} catch (error) {
Log.error(
"{ controller: getuserfeedback, method: getfeedback, type: Exception, status: 400, error: " +
error +
" }"
);
response.status(400).send({ status: 400, message: error });
}
};
module.exports = {
getfeedback
};