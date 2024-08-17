import DBConnection from "../configs/DBConnection";

const addComment = async (commentData) => {
    return new Promise((resolve, reject) => {
        DBConnection.query('INSERT INTO spcomments SET ?', commentData, (err, result) => {
            if (err) {
                console.error(err);
                return reject("Error adding comment");
            }
            resolve(true); // Return true if comment added successfully
        });
    });
};

const getAllComments = async () => {
    return new Promise((resolve, reject) => {
        DBConnection.query('SELECT * FROM spcomments', (err, comments) => {
            if (err) {
                console.error(err);
                return reject("Error retrieving comments");
            }
            resolve(comments); // Return comments array
        });
    });
};

module.exports = {
    addComment,
    getAllComments
};
