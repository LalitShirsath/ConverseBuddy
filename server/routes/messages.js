import express from "express";
const router = express.Router();
import Message from "../models/Message.js";
import { Encrypt, Decrypt } from "../textconversion.js";

//add

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  const encrypted = Encrypt(newMessage.text);
  newMessage.text = encrypted;

  // console.log(newMessage.text);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });

    messages.text = Decrypt(messages.text);

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
