const envelopesArray = require('./envelopes');
let totalBudget = 0;
totalBudget = envelopesArrays.forEach((envelope) => {
  totalBudget += envelope.budget;
});

const updateTotalBudget = (value) => {
  if (typeof value === 'number') {
    totalBudget = totalBudget + value;
  } else {
    return null;
  }
};

module.exports = totalBudget;
