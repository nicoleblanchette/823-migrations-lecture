const Fellow = require('../model/Fellow');

/* 
These controllers take incoming requests and utilize the
methods provided by the Fellow "model" before sending a
response back to the client (or an error message).
*/

// Get All (Read)
const serveFellows = async (req, res) => {
  const fellowsList = await Fellow.list();
  res.send(fellowsList);
}

// Get One (Read)
const serveFellow = async (req, res) => {
  const { id } = req.params;
  const fellow = await Fellow.findById(Number(id));

  if (!fellow) return res.status(404).send(`No fellow with the id ${id}`);
  res.send(fellow);
};

// Create
const createFellow = async (req, res) => {
  const { fellowName } = req.body; // The POST request body will be an object: `{ fellowName: 'name' }`
  const newFellow = await Fellow.create(fellowName);
  res.send(newFellow);
};

// Update
const updateFellow = async (req, res) => {
  const { fellowName } = req.body;
  const { id } = req.params;
  const updatedFellow = await Fellow.editName(Number(id), fellowName);
  // sendStatus sends just the status with no message body
  if (!updatedFellow) return res.sendStatus(404);
  res.send(updatedFellow);
}

// Delete
const deleteFellow = async (req, res) => {
  const { id } = req.params;
  const didDelete = await Fellow.delete(Number(id));
  const statusCode = didDelete ? 204 : 404;
  res.sendStatus(statusCode);
}

module.exports = {
  serveFellows,
  serveFellow,
  createFellow,
  updateFellow,
  deleteFellow
};