const MessagingModel = require("../models/messaging");
const SimulationsModel = require("../models/simulations");

module.exports.sendMessage = async (req, res) => {
  const { societyName, time, content, simulation_FK, postAuthor_id, logo } =
    req.body;
  try {
    const isRead = await SimulationsModel.findByIdAndUpdate(simulation_FK, {
      messages: { read: false, author: postAuthor_id },
    });
    const addMessage = await MessagingModel.create({
      postAuthor_id,
      societyName,
      time,
      content,
      simulation_FK,
      logo,
    });
    res.status(201).send(addMessage);
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

module.exports.loadMessage = async (req, res) => {
  const { simulation_FK, postAuthor_id } = req.query;
  try {
    //On vérifie que l'auteur du message n'est pas le user connecté car on veut que "read"
    //reste sur false pour ses propres messages envoyés
    const isAuthor = await SimulationsModel.find({
      _id: simulation_FK,
      messages: {
        $elemMatch: {
          read: false,
          author: postAuthor_id,
        },
      },
    });

    if (isAuthor.length > 0) {
      let mess = isAuthor[0].messages;
      mess.read = false;
      const isRead = await SimulationsModel.findByIdAndUpdate(simulation_FK, {
        messages: mess,
      });
    } else {
      const isRead = await SimulationsModel.findByIdAndUpdate(simulation_FK, {
        messages: {
          read: true,
          author: postAuthor_id,
        },
      });
    }

    const messages = await MessagingModel.find({
      simulation_FK: simulation_FK,
    });
    res.status(200).send(messages);
  } catch (err) {
    res.status(400).send({ message: err });
  }
};
