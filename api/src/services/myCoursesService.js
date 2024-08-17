import DBConnection from "../configs/DBConnection";

let addLessonToUserCourses = (userId, lessonId, lessonType) => {
    return new Promise((resolve, reject) => {
        DBConnection.query(
            'INSERT INTO my_courses (user_id, lesson_id, lesson_type) VALUES (?, ?, ?)',
            [userId, lessonId, lessonType],
            function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            }
        );
    });
};

let getUserCourses = (userId) => {
    return new Promise((resolve, reject) => {
        DBConnection.query(
            `SELECT l.*, mc.lesson_type 
             FROM my_courses mc 
             JOIN (SELECT 'software' AS lesson_type, id, name, lessonDescription, lessonType, image, lessonPrice FROM softwarelessons
                   UNION ALL
                   SELECT 'sport' AS lesson_type, id, name, lessonDescription, lessonType, image, lessonPrice FROM sportlessons
                   UNION ALL
                   SELECT 'marketing' AS lesson_type, id, name, lessonDescription, lessonType, image, lessonPrice FROM marketinglessons
                   UNION ALL
                   SELECT 'music' AS lesson_type, id, name, lessonDescription, lessonType, image, lessonPrice FROM musiclessons) l
             ON mc.lesson_id = l.id AND mc.lesson_type = l.lesson_type
             WHERE mc.user_id = ?`,
            [userId],
            function (err, rows) {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            }
        );
    });
};


let getUserBalance = (userId) => {
    return new Promise((resolve, reject) => {
        DBConnection.query(
            'SELECT balance FROM users WHERE id = ?',
            [userId],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0].balance);
                }
            }
        );
    });
};

module.exports = {
    addLessonToUserCourses: addLessonToUserCourses,
    getUserCourses: getUserCourses,
    getUserBalance
};
