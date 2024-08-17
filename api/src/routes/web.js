import express from "express";
//import mainPageController from "../controllers/mainPageController";
import homePageController from "../controllers/homePageController";
import softwareController from "../controllers/softwareController";
import lessonCreateController from "../controllers/lessonCreateController";
import musicController from "../controllers/musicController";
import sportController from "../controllers/sportController"
import marketingController from "../controllers/marketingController";
import profileController from "../controllers/profileController"
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";
import auth from "../validation/authValidation";
import passport from "passport";
import initPassportLocal from "../controllers/passportLocalController";
import lessonService from "../services/lessonService";
import commentController from "../controllers/commentController";
import messageController from "../controllers/messageController";
//
import myCoursesController from "../controllers/myCoursesController";
import myCoursesService from "../services/myCoursesService"; 
//sport lesson
import splessonService from "../services/splessonService";
import splessonCreateController from "../controllers/splessonCreateController";
//marketing lesson
import mrlessonService from "../services/mrlessonService";
import mrlessonCreateController from "../controllers/mrlessonCreateController";
//music lesson
import mslessonService from "../services/mslessonService";
import mslessonCreateController from "../controllers/mslessonCreateController";
//sport comment
import spcommentController from "../controllers/spcommentController";
//marketing comment
import mrcommentController from "../controllers/mrcommentController";
//music
import mscommentController from "../controllers/mscommentController";
// Init all passport
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld);
    router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));

    router.get("/register", registerController.getPageRegister);

    router.get("/lessons", async (req, res) => {
        try {
            const lessons = await lessonService.getAllLessons();
            res.render("lessons.ejs", { lessons: lessons });
        } catch (error) {
            console.error(error);
            res.status(500).send("Error retrieving lessons");
        }
    }
);

//sport
router.get("/splessons", async (req, res) => {
    try {
        const lessons = await splessonService.getAllLessons();
        res.render("splessons.ejs", { lessons: lessons });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving lessons");
    }
}
);
router.post("/splessons", loginController.checkLoggedIn ,splessonCreateController.createNewLesson);

//marketing
router.get("/mrlessons", async (req, res) => {
    try {
        const lessons = await mrlessonService.getAllLessons();
        res.render("mrlessons.ejs", { lessons: lessons });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving lessons");
    }
}
);
router.post("/mrlessons", loginController.checkLoggedIn ,mrlessonCreateController.createNewLesson);

//music 
router.get("/mslessons", async (req, res) => {
    try {
        const lessons = await mslessonService.getAllLessons();
        res.render("mslessons.ejs", { lessons: lessons });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving lessons");
    }
}
);
router.post("/mslessons", loginController.checkLoggedIn ,mslessonCreateController.createNewLesson);

    router.post("/lessons", loginController.checkLoggedIn ,lessonCreateController.createNewLesson);
    router.get("/software", softwareController.getPageSoftware);
    router.get("/sport", sportController.getPageSport);
    router.get("/marketing", marketingController.getPageMarketing);
    router.get("/music", musicController.getPageMusic);
    router.get("/profile", loginController.checkLoggedIn, profileController.getPageProfile);  
    router.post("/register", auth.validateRegister, registerController.createNewUser);
    router.post("/logout", loginController.postLogOut);
    router.post('/profile/add-balance', profileController.addBalance);
    router.post("/comments", loginController.checkLoggedIn, commentController.addComment);
    router.get("/comments", loginController.checkLoggedIn, commentController.getAllComments);
    router.post("/message", loginController.checkLoggedIn, messageController.addMessage);
    //mycourse
    router.get("/mycourse", loginController.checkLoggedIn, myCoursesController.getUserCourses);
    router.post('/mycourses/pay', myCoursesController.payForCourses);
    //sport
    router.post("/spcomments", loginController.checkLoggedIn, spcommentController.addComment);
    router.get("/spcomments", loginController.checkLoggedIn, spcommentController.getAllComments);
    //marketing
    router.post("/mrcomments", loginController.checkLoggedIn, mrcommentController.addComment);
    router.get("/mrcomments", loginController.checkLoggedIn, mrcommentController.getAllComments);
    //music
    router.post("/mscomments", loginController.checkLoggedIn, mscommentController.addComment);
    router.get("/mscomments", loginController.checkLoggedIn, mscommentController.getAllComments);
    //uodate
    router.post('/profile/update', profileController.updateProfile);
    router.post('/profile/update-password', profileController.updatePassword);
    
    return app.use("/", router);
    
};
 
//take-lesson
router.post("/take-lesson", loginController.checkLoggedIn, async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user contains the logged-in user's info
        const { lessonId, lessonType } = req.body;
        await myCoursesService.addLessonToUserCourses(userId, lessonId, lessonType);
        res.status(200).send("Lesson added to your courses");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error taking lesson");
    }
});



export default router; 
module.exports = initWebRoutes;