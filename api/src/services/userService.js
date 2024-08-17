import DBConnection from "../configs/DBConnection";

let createUser = (user) => {
    return new Promise((resolve, reject) => {
        // Assuming user object contains user information like name, email, etc.
        DBConnection.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [user.name, user.email, user.password],
            function (err, result) {
                if (err) {
                    reject(err);
                }
                let userId = result.insertId;
                // Initialize user balance
                DBConnection.query(
                    'INSERT INTO user_balances (user_id, balance) VALUES (?, ?)',
                    [userId, 0], // assuming initial balance is 0
                    function (err, result) {
                        if (err) {
                            reject(err);
                        }
                        resolve(userId);
                    }
                );
            }
        );
    });
};

const getUserBalance = (userId) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT balance FROM user_balances WHERE user_id = ?";
        console.log(`Executing query to get balance: ${query} with userId: ${userId}`);
        DBConnection.query(query, [userId], (error, result) => {
            if (error) {
                console.error('Error getting user balance:', error);
                return reject(error);
            }
            if (result.length === 0) {
                console.log('No balance found for userId:', userId);
                return resolve(null); // No balance found
            }
            console.log('Balance fetched for userId:', userId, 'is:', result[0].balance);
            return resolve(result[0].balance);
        });
    });
};

const addUserBalance = (userId, amount) => {
    return new Promise((resolve, reject) => {
        const updateQuery = "UPDATE user_balances SET balance = balance + ? WHERE user_id = ?";
        DBConnection.query(updateQuery, [amount, userId], (error, result) => {
            if (error) {
                console.error('Error updating user balance:', error);
                return reject(error);
            }
            return resolve(result);
        });
    });
};



let initializeUserBalances = () => {
    DBConnection.query(
        'INSERT INTO user_balances (user_id, balance) ' +
        'SELECT id, 0 FROM users WHERE id NOT IN (SELECT user_id FROM user_balances)',
        function (err, result) {
            if (err) {
                console.error('Error initializing user balances:', err);
            } else {
                console.log('Initialized balances for existing users:', result.affectedRows);
            }
        }
    );
};

const deductUserBalance = (userId, amount) => {
    return new Promise((resolve, reject) => {
        const updateQuery = "UPDATE user_balances SET balance = balance - ? WHERE user_id = ?";
        console.log(`Executing query to deduct balance: ${updateQuery} with amount: ${amount}, userId: ${userId}`);
        DBConnection.query(updateQuery, [amount, userId], (error, result) => {
            if (error) {
                console.error('Error deducting user balance:', error);
                return reject(error);
            }
            console.log('Balance deducted for userId:', userId, 'with amount:', amount);
            console.log('Result:', result);
            return resolve(result);
        });
    });
};

const updateUserProfile = (userId, fullname, email) => {
    return new Promise((resolve, reject) => {
        const updateQuery = "UPDATE users SET fullname = ?, email = ? WHERE id = ?";
        DBConnection.query(updateQuery, [fullname, email, userId], (error, result) => {
            if (error) {
                console.error('Error updating user profile:', error);
                return reject(error);
            }
            if (result.affectedRows === 0) {
                console.log('No user found for userId:', userId);
                return resolve(null); // No user found
            }
            console.log('Profile updated for userId:', userId);
            return resolve(result);
        });
    });
};

const getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE id = ?";
        DBConnection.query(query, [userId], (error, results) => {
            if (error) {
                console.error('Error fetching user:', error);
                return reject(error);
            }
            resolve(results[0]);
        });
    });
};

const updateUserPassword = (userId, newPassword) => {
    return new Promise((resolve, reject) => {
        const updateQuery = "UPDATE users SET password = ? WHERE id = ?";
        DBConnection.query(updateQuery, [newPassword, userId], (error, result) => {
            if (error) {
                console.error('Error updating password:', error);
                return reject(error);
            }
            resolve(result);
        });
    });
};

initializeUserBalances();

module.exports = {
    createUser,
    getUserBalance,
    addUserBalance,
    deductUserBalance,
    updateUserProfile,
    getUserById,
    updateUserPassword
};
