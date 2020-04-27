exports.success = (body) => responseBuilder(200, body);

exports.failure = (status, body) => responseBuilder(status, body);

const responseBuilder = (status, body) => ({
	statusCode: status,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': true
	},
	body: JSON.stringify(body)
});