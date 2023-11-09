const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.port || 5000;

// middleware

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b9hatji.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const serviceCollection = client.db("carDoctor").collection("services");
    const bookingCollection = client.db("carDoctor").collection("bookings");

    // auth relate api

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      console.log(user);
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "none",
        })
        .send({ success: true });
    });

    // 1) Get all the data [READ] *** This is for services Collection ***
    app.get("/services", async (req, res) => {
      const cursor = serviceCollection.find(); // find diye oi collection er document khujtesi jodi kichu thake tahole oita dibe na thakle empty cursor
      const result = await cursor.toArray(); //toArray() iterate through the matching documents
      res.send(result);
    });

    // 2) Get Single Data [Read]

    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const options = {
        projection: { title: 1, price: 1, service_id: 1, img: 1 }, // jodi kono propertiy er value chai tahole dibo 1 na chaile 0
      };
      const result = await serviceCollection.findOne(query, options);
      res.send(result);
    });

    // 3) Insert Single data [Create]  *** This is for Bookings Collection ***

    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    });

    // 4) Get specific data/Some Data  ,  [Read]

    app.get("/bookings", async (req, res) => {
      console.log(req.query.email); // req.query ekhon ekta empty ekta object karon ami kono object pass kori nai!

      let query = {};

      if (req.query.email) {
        query = { email: req.query.email };
      } // req er moddhe query er moddhe jodi email jinis ta thake tahole query er man ta change kore bolba jei email ta chaisi sei email related data gula amake dao!

      const cursor = bookingCollection.find(query); // find diye oi collection er document khujtesi jodi kichu thake tahole oita dibe na thakle empty cursor
      const result = await cursor.toArray(); //toArray() iterate through the matching documents
      res.send(result);
    });

    // 5) Delete a single data [Delete]

    app.delete("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookingCollection.deleteOne(query);
      res.send(result);
    });

    // 6) Patch a single document [Update] {Jodi na thake tumi add kore diba r patch hocche update korbe single ekta jinis k}

    app.patch("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateBooking = req.body;
      console.log(updateBooking);
      const updateDoc = {
        $set: {
          status: updateBooking.status,
        },
      };
      const result = await bookingCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Doctor is runnig!");
});

app.listen(port, () => {
  console.log(`Car Doctor server is runnig on port ${port}`);
});
//Keeping up commits with client!
