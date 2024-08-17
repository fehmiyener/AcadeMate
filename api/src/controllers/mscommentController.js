const mscommentService = require("../services/mscommentService");

const addComment = async (req, res) => {
    let commentData = {
        user_id: req.user.id,
        lesson_id: req.body.lessonId,
        userName: req.body.userName,
        content: req.body.content
    };

    try {
        await mscommentService.addComment(commentData);
        return res.redirect("/mscomments");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error adding comment");
    }
};

const getAllComments = async (req, res) => {
    try {
        const comments = await mscommentService.getAllComments();
        return res.render("mscomments.ejs", { comments: comments });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error retrieving comments");
    }
};

module.exports = {
    addComment,
    getAllComments
};
