
const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const bodyParser = require('body-parser');
const { Result } = require('postcss');
const { ObjectId } = require('mongodb');
var cors = require('cors')


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';
const app = express()
const port = 3000
app.use(cors())
app.use(bodyParser.json())


client.connect()
//get all passwords
app.get('/', async(req, res) => {

  const db = client.db(dbName);
  const collection = db.collection('passwords');

  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
//save all the passwords


//........save passwords............
app.post('/passwords', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');

  try {
    const insertResult = await collection.insertOne(password);
    res.status(201).send({ success: true, insertedId: insertResult.insertedId });
  } catch (error) {
    console.error('Error inserting password:', error);
    res.status(500).send({ success: false, error: error.message });
  }
});
//..............put...............
app.put('/passwords/:id', async (req, res) => {
  const passwordId = req.params.id; // Get the password ID from the request parameters
  const updatedPassword = { ...req.body }; // Clone the request body

  // Remove _id field to avoid updating it
  delete updatedPassword._id;
  

  
  const db = client.db(dbName);
  const collection = db.collection('passwords');

  try {
    const updateResult = await collection.updateOne(
      { _id: new ObjectId(passwordId) }, // Find the document by ID
      { $set: updatedPassword }           // Update the document with the new data
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).send({ success: false, message: 'Password not found or no changes made.' });
    }

    res.send({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).send({ success: false, error: error.message });
  }
});
//.............end put...............

// Delete a password by ID
app.delete('/delete/:id', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  
  const { id } = req.params;
  console.log(id)

  try {
    const objectId = new ObjectId(id);
    const result = await collection.deleteOne({ _id: objectId});
      console.log(result)
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Password deleted successfully' });
    } else {
      res.status(404).json({ message: 'Password not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting password', error });
  }
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})