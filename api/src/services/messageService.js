import DBConnection from "../configs/DBConnection";

const addMessage = async (messageData) => {
    return new Promise((resolve, reject) => {
        DBConnection.query('INSERT INTO messages SET ?', messageData, (err, result) => {
            if (err) {
                console.error(err);
                return reject("Error adding message");
            }
            resolve(true); // Return true if comment added successfully
        });
    });
};
 


module.exports = {
    addMessage
};
