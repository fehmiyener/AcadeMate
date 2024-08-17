const commentService = require("../services/commentService");

const addComment = async (req, res) => {
    let commentData = {
        user_id: req.user.id,
        lesson_id: req.body.lessonId,
        userName: req.body.userName,
        content: req.body.content
    };

    try {
        await commentService.addComment(commentData);
        return res.redirect("/comments");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error adding comment");
    }
};

const getAllComments = async (req, res) => {
    try {
        const comments = await commentService.getAllComments();
        return res.render("comments.ejs", { comments: comments });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error retrieving comments");
    }
};

module.exports = {
    addComment,
    getAllComments
};
