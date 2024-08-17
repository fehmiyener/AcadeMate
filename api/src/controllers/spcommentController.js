const spcommentService = require("../services/spcommentService");

const addComment = async (req, res) => {
    let commentData = {
        user_id: req.user.id,
        lesson_id: req.body.lessonId,
        userName: req.body.userName,
        content: req.body.content
    };

    try {
        await spcommentService.addComment(commentData);
        return res.redirect("/spcomments");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error adding comment");
    }
};

const getAllComments = async (req, res) => {
    try {
        const comments = await spcommentService.getAllComments();
        return res.render("spcomments.ejs", { comments: comments });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error retrieving comments");
    }
};

module.exports = {
    addComment,
    getAllComments
};
