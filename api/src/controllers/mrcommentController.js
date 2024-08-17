const mrcommentService = require("../services/mrcommentService");

const addComment = async (req, res) => {
    let commentData = {
        user_id: req.user.id,
        lesson_id: req.body.lessonId,
        userName: req.body.userName,
        content: req.body.content
    };

    try {
        await mrcommentService.addComment(commentData);
        return res.redirect("/mrcomments");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error adding comment");
    }
};

const getAllComments = async (req, res) => {
    try {
        const comments = await mrcommentService.getAllComments();
        return res.render("mrcomments.ejs", { comments: comments });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error retrieving comments");
    }
};

module.exports = {
    addComment,
    getAllComments
};
