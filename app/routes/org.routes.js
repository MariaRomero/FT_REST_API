module.exports = (app) => {
    const orgs = require('../controllers/org.controller.js');

    // Create a new Org
    app.post('/orgs', orgs.create);

    // Retrieve all Orgs
    app.get('/orgs', orgs.findAll);

    // Retrieve a single Org with orgId
    app.get('/orgs/:orgId', orgs.findOne);

    // Update an Org with orgId
    app.put('/orgs/:orgId', orgs.update);

    // Delete an Org with orgId
    app.delete('/orgs/:orgId', orgs.delete);
}