const dynamodbLib = require('dynamodb-lib');
const responseLib = require('response-lib');

exports.handler = async (event, context) => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  const params = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: '#Sect = :sect',
    ExpressionAttributeNames: {
      '#Sect': 'Section'
    },
    ExpressionAttributeValues: {
      ':sect': {'S':'apps'}
    },
    ScanIndexForward: false
  };

  try {
    const data = await dynamodbLib.call('query', params);
    return responseLib.success(data.Items);
  } catch (e) {
    return responseLib.failure(e.statusCode, {
      code: e.code,
      message: e.message
    });
  }
};
