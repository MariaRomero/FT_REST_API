const Org = require('../models/org.model.js');
const chalk = require('chalk');
// Create and Save a new Org
exports.create = (req, res) => {
 
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "When creating an Org it's name can not be empty"
        });
    }

    if (!req.body.yearFounded) {
        return res.status(400).send({
            message: "When creating an Org it's Year Founded can not be empty"
        });
    }

    if (!req.body.revenue) {
        return res.status(400).send({
            message: "When creating an Org it's Revenue can not be empty"
        });
    }

    // Create an Org
    const org = new Org({
        Name: req.body.name,
        YearFounded: req.body.yearFounded,
        Revenue: req.body.revenue
    });
    console.log('org',chalk.blue(org));
    // Save Note in the database
    org.save()
    .then(data => {
        console.log(data);
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Org."
        });
    });
};

// Retrieve and return all orgs from the database.
exports.findAll = (req, res) => {
    Org.find()
    .then(orgs => {
        res.send(orgs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the orgs."
        });
    });
};

// Find a single org with a orgId
exports.findOne = (req, res) => {
    Org.findById(req.params.orgId)
    .then(org => {
        if (!org) {
            return res.status(404).send({
                message: "Org not found with id " + req.params.orgId
            });
        }
        res.send(org);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Org not found with id " + req.params.orgId
            });
        }
        return res.status(500).send({
            message: "Error retrieving org with id " + req.params.orgId
        });
    });
};

// Update an org identified by the orgId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Org's name can not be empty"
        });
    }

    if (!req.body.yearFounded) {
        return res.status(400).send({
            message: "Org's Year Founded can not be empty"
        });
    }

    if (!req.body.Revenue) {
        return res.status(400).send({
            message: "Org's Revenue can not be empty"
        });
    }

    // Find note and update it with the request body
    Org.findByIdAndUpdate(req.params.orgId, {
        Name: req.body.name,
        YearFounded: req.body.yearFounded,
        Revenue: req.body.revenue
    }, {
        new: true
    })
    .then(org => {
        if (!org) {
            return res.status(404).send({
                message: "Org not found with id " + req.params.orgId
            });
        }
        res.send(org);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Org not found with id " + req.params.orgId
            });
        }
        return res.status(500).send({
            message: "Error updating org with id " + req.params.orgId
        });
    });
};

// Delete an org with the specified orgId in the request
exports.delete = (req, res) => {
    Org.findByIdAndRemove(req.params.orgId)
    .then(org => {
        if (!org) {
            return res.status(404).send({
            message: "Org not found with id " + req.params.orgId
            });
        }
        res.send({
            message: "Org deleted successfully!"
        });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Org not found with id " + req.params.orgId
            });
        }
        return res.status(500).send({
            message: "Could not delete the org with id " + req.params.orgId
        });
    });
};