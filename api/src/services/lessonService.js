import DBConnection from "../configs/DBConnection.js";

export const createNewLesson = (data, user_id) => {
    return new Promise((resolve, reject) => {
        const lessonItem = {
            user_id: user_id,
            iname: data.instructorName,
            isurname: data.instructorSurname,
            inumber: data.instructorNumber,
            igraduation: data.instructorGraduate,
            iexperience: data.instructorExperience,
            name: data.lessonName,
            lessonDescription: data.lessonDescription,
            lessonType: data.lessonType,
            image: data.lessonImage,
            lessonPrice: data.lessonPrice
        };

        DBConnection.query(
            'INSERT INTO softwarelessons SET ?', lessonItem,
            function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            }
        );
    });
};

export const getAllLessons = () => {
    return new Promise((resolve, reject) => {
        DBConnection.query(
            'SELECT * FROM softwarelessons',
            function (err, rows) {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            }
        );
    });
};
