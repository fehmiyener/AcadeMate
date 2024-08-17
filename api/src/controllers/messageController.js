const messageService = require("../services/messageService");

const addMessage = async (req, res) => {
    let messageData = {
        user_id: req.user.id,
        name: req.body.name,
        mail: req.body.mail,
        content: req.body.content
    };

    try {
        await messageService.addMessage(messageData);
        return res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error adding message" });
    }
};

module.exports = {
    addMessage
};
