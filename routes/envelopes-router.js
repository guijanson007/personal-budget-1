const {
  envelopesArray,
  addNewEnvelope,
  getAllEnvelopes,
  getEnvelopeById,
  updateInstanceInDatabase,
  deleteInstanceInDatabaseById,
} = require('../global-variables/envelopes');

const envelopesRouter = require('express').Router();

envelopesRouter.get('/', (req, res) => {
  res.status(200).send(getAllEnvelopes());
});

envelopesRouter.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.sendStatus(400);
  } else {
    const foundEnvelope = getEnvelopeById(req.params.id);
    if (foundEnvelope) {
      res.status(200).send(foundEnvelope);
    } else {
      res.sendStatus(404);
    }
  }
});

envelopesRouter.post('/', (req, res) => {
  if (!req.body) {
    res.sendStatus(404);
  } else {
    const purpose = req.body.purpose;
    const budget = req.body.budget;
    addNewEnvelope(purpose, budget);
    res.status(201).send(req.body);
  }
});

envelopesRouter.put('/:id', (req, res) => {
  //check if request id parameter has been provided
  if (!req.params.id) {
    res.sendStatus(400);
  } else {
    const id = req.params.id;
    //check if request body is empty
    if (!req.body) {
      res.sendStatus(400);
    } else {
      //try to find the current element in the DB and manage possible errors
      const oldElement = getEnvelopeById(id);
      if (!oldElement) {
        res.sendStatus(404);
      } else {
        const newElement = { ...oldElement, ...req.body };
        updateInstanceInDatabase(newElement);
        if (!updateInstanceInDatabase) {
          res.sendStatus(404);
        } else {
          console.log(newElement);
          res.status(200).send(newElement);
        }
      }
    }
  }
});

envelopesRouter.delete('/:id', (req, res) => {
  const wasDeleteSuccessful = deleteInstanceInDatabaseById(req.params.id);
  if (!wasDeleteSuccessful) {
    res.sendStatus(404);
  } else {
    res.sendStatus(204);
  }
});

envelopesRouter.post('/transfer/:id1/:id2', (req, res) => {
  // Checking if the transfer value was given in the headers
  const value = Number(req.headers['transfer-value']);
  if (isNaN(value) || value <= 0) {
    return res.status(422).send('Invalid transfer value');
  } else {
    //id validation
    if (req.params.id1 && req.params.id2) {
      const id1 = Number(req.params.id1);
      const id2 = Number(req.params.id2);
      if (isNaN(id1) || isNaN(id2)) {
        res.status(422).send('Invalid Envelope IDs');
      } else {
        //search both envelopes in DB
        const envelope1 = getEnvelopeById(id1);
        const envelope2 = getEnvelopeById(id2);

        //validation
        if (!envelope1 || !envelope2) {
          res.status(404).send('One or both envelopes not found');
        } else {
          //check if envelope has enough funds
          if (envelope1.budget < value) {
            res.status(422).send('Insufficient funds');
          } else {
            // Perform the transfer
            const newEnvelope1 = {
              ...envelope1,
              budget: envelope1.budget - value,
            };
            const newEnvelope2 = {
              ...envelope2,
              budget: envelope2.budget + value,
            };

            //update db with new values
            const updateEnvelope1 = updateInstanceInDatabase(newEnvelope1);
            const updateEnvelope2 = updateInstanceInDatabase(newEnvelope2);

            //validation
            if (updateEnvelope1 && updateEnvelope2) {
              res.status(200).send('Success');
            } else {
              res.sendStatus(404);
            }
          }
        }
      }
    }
  }
});

module.exports = envelopesRouter;
