module.exports = (app) => {
    const contact = require('../controller/contact.controller.js');
    const {verifyToken} = require('../middleware/verifytokendata.js')

    // Create a new Note
    app.post('/contact', contact.create);

    // // Retrieve all contact
    app.get('/contact', contact.findAll);

    // // Retrieve a single Contact with contactId
    app.get('/contact/:contactId', contact.findOne);

    // // Update a Note with contactId
    app.put('/contact/:contactId', contact.update);

    // // Delete a Note with contactId
    app.delete('/contact/:contactId', contact.delete);

    // // Delete all contact
    app.delete('/contact', contact.deleteAll);
}
