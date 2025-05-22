import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Only allow POST method for actual data processing
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }
    
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      return res.status(500).json({ message: "MongoDB URI is not configured" });
    }

    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    try {
      await client.connect();
      const db = client.db("studentsDB");
      const collection = db.collection("users");

      await collection.insertOne({ name, email, timestamp: new Date() });
      res.status(200).json({ message: "User added successfully!" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Database connection error" });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
