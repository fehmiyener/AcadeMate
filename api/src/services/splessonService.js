import DBConnection from "../configs/DBConnection";

let createNewLesson = (data, user_id) => {
    return new Promise((resolve, reject) => {
        let lessonItem = {
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
            'INSERT INTO sportlessons SET ?', lessonItem,
            function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            }
        );
    });
};



let getAllLessons = () => {
    return new Promise((resolve, reject) => {
        DBConnection.query(
            'SELECT * FROM sportlessons',
            function (err, rows) {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            }
        );
    });
};




//


module.exports = {
    createNewLesson: createNewLesson,
    getAllLessons: getAllLessons,
   
    //
    
};
