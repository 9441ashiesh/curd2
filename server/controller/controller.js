const AWS = require('aws-sdk');
const { DbName, dynamoDB } = require('../database/db.config.js');

// const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.create = (req, res) => {
    // Validate request
    if (!req.body.BookID || !req.body.BookName || !req.body.AuthorName || !req.body.BookPrice || !req.body.PublishedDate) {
        res.status(400).send({ message: "All fields are required!" });
        return;
    }

    const params = {
        TableName: DbName, // Replace with your DynamoDB table name
        Item: {
            BookID: req.body.BookID,
            BookName: req.body.BookName,
            AuthorName: req.body.AuthorName,
            BookPrice: req.body.BookPrice,
            PublishedDate: req.body.PublishedDate,
        }
    };

    dynamoDB.put(params, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        } else {
            res.send(data);
        }
    });
};

//get all books
exports.getBook = (req, res) => {
    const params = {
        TableName:DbName, // Replace with your DynamoDB table name
    };

    dynamoDB.scan(params, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving books."
            });
        } else {
            res.send(data.Items);
        }
    });
};

//get single book

exports.find = (req, res) => {
    //validate request
    if (req.query.id) {
        const id = req.query.id;
        const params = {
            TableName: DbName, // Replace with your DynamoDB table name
            Key: {
                BookID: id
            }
        };

        dynamoDB.get(params, (err, data) => {
            if (err) {
                res.status(500).send({ message: "Error retrieving book with id " + id });
            } else {
                res.send(data.Item);
            }
        });
    } else {
        const params = {
            TableName: DbName, // Replace with your DynamoDB table name
        };

        dynamoDB.scan(params, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving books."
                });
            } else {
                res.send(data.Items);
            }
        });
    }
};

//update a book

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "All fields are required!" });
        return;
    }

    const id = req.params.id;

    const params = {
        TableName: DbName, // Replace with your DynamoDB table name
        Key: {
            BookID: id
        },
        UpdateExpression: "set BookName = :BookName, AuthorName = :AuthorName, BookPrice = :BookPrice, PublishedDate = :PublishedDate",
        ExpressionAttributeValues: {
            ":BookName": req.body.BookName,
            ":AuthorName": req.body.AuthorName,
            ":BookPrice": req.body.BookPrice,
            ":PublishedDate": req.body.PublishedDate,
        },
        ReturnValues: "UPDATED_NEW"
    };

    dynamoDB.update(params, (err, data) => {
        if (err) {
            res.status(500).send({ message: "Error updating book with id " + id });
        } else {
            res.send(data);
        }
    });
};

//delete a book

exports.delete = (req, res) => {
    const id = req.params.id;

    const params = {
        TableName: DbName, // Replace with your DynamoDB table name
        Key: {
            BookID: id
        }
    };

    dynamoDB.delete(params, (err, data) => {
        if (err) {
            res.status(500).send({ message: "Could not delete book with id " + id });
        } else {
            res.send({
                message: "Book deleted successfully!"
            });
        }
    });
};

