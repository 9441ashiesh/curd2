const AWS = require('aws-sdk');

AWS.config.update({
    region: 'ap-south-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


const dynamoDB = new AWS.DynamoDB.DocumentClient();
const DbName = 'BookDb';

module.exports = { dynamoDB, DbName };