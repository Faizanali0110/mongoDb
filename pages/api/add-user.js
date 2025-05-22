import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email } = req.body;
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return res.status(500).json({ message: "MongoDB URI is not configured" });
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("studentsDB");
    const collection = db.collection("users");

    await collection.insertOne({ name, email, timestamp: new Date() });
    res.status(200).json({ message: "User added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
}
