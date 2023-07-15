const { MongoClient, ObjectId } = require('mongodb');

async function main() {
  const uri = 'mongodb://0.0.0.0:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('contact');
    const collection = database.collection('contactlist');

   
    const allContacts = await collection.find().toArray();
    console.log('All Contacts:');
    console.log(allContacts);

    
    const personId = 'id'; 
    const person = await collection.findOne({ _id: ObjectId(personId) });
    console.log('Person Information:');
    console.log(person);

    
    const contactsOver18 = await collection.find({ age: { $gt: 18 } }).toArray();
    console.log('Contacts Over 18:');
    console.log(contactsOver18);

   
    const contactsOver18WithNameAh = await collection.find({
      age: { $gt: 18 },
      first_name: /ah/
    }).toArray();
    console.log('Contacts Over 18 with Name containing "ah":');
    console.log(contactsOver18WithNameAh);

    
    await collection.updateOne({ first_name: 'Seif' }, { $set: { first_name: 'Anis' } });

   
    await collection.deleteMany({ age: { $lt: 5 } });

   
    const allContactsAfterModifications = await collection.find().toArray();
    console.log('All Contacts after Modifications:');
    console.log(allContactsAfterModifications);
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

main().catch(console.error);