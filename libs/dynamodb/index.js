const AWS = require('aws-sdk');

exports.call = (action, params) => {
	const dynamodb = new AWS.DynamoDB({
		apiVersion: '2012-08-10'
	});
	
	return dynamodb[action](params).promise();
};