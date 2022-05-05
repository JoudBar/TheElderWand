const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://milanlaukens:tWmMVb@ZrVKeg5D@cluster0.tjjs8.mongodb.net/it-project?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const main = async () => {
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

main();
