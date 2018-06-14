const express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    propertyParser = require('./modules/property-parser'),
    addressParser = require('./modules/address-parser');

const app = express();

const expressConfig = config.express;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use((error, request, response, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        response.status(400).send({ "error": "Could not decode request: JSON parsing failed" });
    }
});

app.post('/', (request, response, next) => {
    try {
        const requestPayload = request.body.payload;

        const responsePayload = propertyParser.filterHtvCompleted(requestPayload)
            .map(property => {
                return {
                    concataddress: addressParser.concatAddress(property.address),
                    type: property.type,
                    workflow: property.workflow
                };
            });

            response.send({ responseponse: responsePayload });

    } catch (error) {
        next(error);
    }
});

app.listen(expressConfig.port, function () {
    console.log('Server is listening on port: ', expressConfig.port);
});

app.use('*', (req, res) => {
    res.status(404).send({ error: 'Resource not found' });
});
