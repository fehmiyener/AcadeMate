
import splessonService from "./../services/splessonService";

let getCreateLessonPage = (req, res) => {
    return res.render("splessons.ejs");
};

let createNewLesson = async (req, res) => {
    let lessonData = {
        instructorName: req.body.iname,
        instructorSurname: req.body.isurname,
        instructorNumber:req.body.inumber,
        instructorGraduate: req.body.igraduation,
        instructorExperience: req.body.iexperience,
        lessonName: req.body.name,
        lessonDescription: req.body.lessonDescription,
        lessonType: req.body.lessonType,
        lessonImage: req.body.image,
        lessonPrice: req.body.lessonPrice,
    };

    try {
        
        // Add the new lesson to the user's courses
        await splessonService.createNewLesson(lessonData, req.user.id);
        return res.redirect("/splessons"); // Redirect to profile page after lesson creation
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error creating new lesson");
    }
};

module.exports = {
    getCreateLessonPage: getCreateLessonPage,
    createNewLesson: createNewLesson
};
