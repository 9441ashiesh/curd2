const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller')

route.get('/', services.homeRoutes);

route.get('/add-book', services.add_book)

route.get('/update-book', services.update_book)

route.post('/api/book', controller.create);
route.get('/api/book', controller.getBook);
route.get('/api/book/:id', controller.find);
route.put('/api/book/:id', controller.update);
route.delete('/api/book/:id', controller.delete);

module.exports = route
