const dynamodbLib = require('dynamodb-lib');
const responseLib = require('response-lib');

exports.handler = async (event, context) => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  const params = {
    TableName: process.env.TABLE_NAME,
    ConditionExpression: 'attribute_not_exists(DateCompleted)',
    ReturnConsumedCapacity: 'INDEXES',//'TOTAL',
    // ReturnValues: 'ALL_NEW', // Error: ReturnValues can only be ALL_OLD or NONE
    Item: {
      Section: {
        S: "apps"
      },
      DateCompleted: {
        S: "2017-12-06"
      },
      Type: {
        S: "work"
      },
      Name: {
        S: "illico"
      },
      Languages: {
        SS: [
          "AngularJS (v1.5)", "jQuery", "Java", "Oracle Commerce"
        ]
      },
      Image: {
        M: {
          "En": {
            S: "videotron-mobility-640-en.jpg"
          },
          "Fr": {
            S: "videotron-mobility-640-fr.jpg"
          }
        }
      },
      Url: {
        M: {
          "En": {
            S: "https://videotron.com/en"
          },
          "Fr": {
            S: "https://videotron.com/"
          }
        }
      }
    }
  };

  try {
    await dynamodbLib.call('putItem', params);
    return responseLib.success('Item added!!!');
  } catch(e) {
    return responseLib.failure(e.statusCode, {
      code: e.code,
      message: e.message
    });
  }
};
