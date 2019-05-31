const responses = require('../model/responses')
const path = require('path')
const apiPrefix = '/api/registration'
const registrationModel = require('../model/registration.schema')
const registrationService = require('../service/registration.service')({
    modelService: registrationModel
});
module.exports = {
    insert: insert,
    getAll: getAll,
    getOneById: getOneById,
    updateById: updateById,
    removeById: removeById
}


function insert(req, res) {
    registrationService
        .insert(req.body)
        .then(entry => {

            const responseModel = new responses.ItemResponse();
            responseModel.item = entry;
            responseModel.alert.modalMessage = "Entry successfully saved!"
            res
                .status(201)
                .location(path.join(apiPrefix, entry._id.toString()))
                .json(responseModel);
        })
        .catch(err => {

            return res.status(500).send('failure')
        });
}

function getAll(req, res) {

    registrationService
        .getAll()
        .then(entry => {

            const responseModel = new responses.ItemsResponse();
            responseModel.items = entry;
            responseModel.alert.modalMessage = "Here are all entries!"
            res.json(responseModel);
        })
        .catch(err => {
            res.status(500).send(new responses.ErrorResponse(err));
        });
}

function getOneById(req, res) {
    let queryCondition = {
        _id: req.params.id
    }
    registrationService
        .getOne(queryCondition)
        .then(entry => {
            const responseModel = new responses.ItemResponse();
            responseModel.item = entry;
            responseModel.alert.modalMessage = "Your Entry was Successfully Retrieved!"
            res.json(responseModel);
        })
        .catch(err => {
            return res.status(500).send(new responses.ErrorResponse(err));
        });
}

function updateById(req, res) {
    debugger
    let queryCondition = {
        _id: req.params.id
    };
    registrationService
        .updateOne(queryCondition, req.body)
        .then(entry => {
            const responseModel = new responses.ItemResponse();
            responseModel.item = entry
            responseModel.alert.modalMessage = "Your Entry was Successfully Updated!"
            res.status(204).json(responseModel);
        })
        .catch(err => {
            return res.status(500).send(new responses.ErrorResponse(err.stack));
        });
}

function removeById(req, res) {
    let queryCondition = {
        _id: req.params.id
    };
    registrationService
        .removeOne(queryCondition)
        .then(entry => {
            const responseModel = new responses.ItemResponse();
            responseModel.item = entry;
            responseModel.alert.modalMessage = "Your Entry was Successfully Deleted!"
            res.json(responseModel);
        })
        .catch(err => {
            return res.status(500).send(new responses.ErrorResponse(err));
        });
}