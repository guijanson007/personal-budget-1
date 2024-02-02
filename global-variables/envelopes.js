let envelopesArray = [
  {
    id: 1,
    purpose: 'Travel to Rome',
    budget: 1000,
  },
  {
    id: 2,
    purpose: 'Buy a new car',
    budget: 10000,
  },
  {
    id: 3,
    purpose: 'Travel to Brazil',
    budget: 4000,
  },
  {
    id: 4,
    purpose: 'Buy an iPad',
    budget: 1000,
  },
];

let idCounter = 4;

const getEnvelopeIndexById = (id) => {
  id = Number(id);
  const envelopeIndex = envelopesArray.findIndex(
    (envelope) => envelope.id === id
  );
  if (!envelopeIndex) {
    return null;
  } else {
    return envelopeIndex;
  }
};

const getAllEnvelopes = () => {
  let resArray = [];
  envelopesArray.forEach((envelope) => {
    resArray.push(envelope);
  });
  return resArray;
};
const addNewEnvelope = (purpose, budget) => {
  if ((purpose, budget)) {
    envelopesArray.push({
      id: idCounter + 1,
      purpose: purpose,
      budget: budget,
    });
    idCounter++;
    return true;
  } else {
    return null;
  }
};

const getEnvelopeById = (id) => {
  id = Number(id);
  const envelope = envelopesArray.find((env) => env.id === id);
  if (envelope) {
    return envelope;
  } else {
    return null;
  }
};

const updateInstanceInDatabase = (newInstance) => {
  id = Number(newInstance.id);
  const index = getEnvelopeIndexById(id);
  if (!index) {
    return null;
  } else {
    envelopesArray[index] = newInstance;
    return true;
  }
};

const deleteInstanceInDatabaseById = (id) => {
  id = Number(id);
  const deletableEnvelopeIndex = getEnvelopeIndexById(id);
  if (!deletableEnvelopeIndex) {
    return null;
  } else {
    envelopesArray.splice(deletableEnvelopeIndex, 1);
    return true;
  }
};

module.exports = {
  envelopesArray,
  getAllEnvelopes,
  addNewEnvelope,
  getEnvelopeById,
  updateInstanceInDatabase,
  deleteInstanceInDatabaseById,
};
