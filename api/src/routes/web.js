import express from "express";
//import mainPageController from "../controllers/mainPageController";
import homePageController from "../controllers/homePageController.js";
import softwareController from "../controllers/softwareController.js";
import lessonCreateController from "../controllers/lessonCreateController.js";
import musicController from "../controllers/musicController.js";
import sportController from "../controllers/sportController.js"
import marketingController from "../controllers/marketingController.js";
import profileController from "../controllers/profileController.js"
import registerController from "../controllers/registerController.js";
import loginController from "../controllers/loginController.js";
import auth from "../validation/authValidation.js";
import passport from "passport";
import initPassportLocal from "../controllers/passportLocalController.js";
import lessonService from "../services/lessonService.js";
import commentController from "../controllers/commentController.js";
import messageController from "../controllers/messageController.js";
//
import myCoursesController from "../controllers/myCoursesController.js";
import myCoursesService from "../services/myCoursesService.js"; 
//sport lesson
import splessonService from "../services/splessonService.js";
import splessonCreateController from "../controllers/splessonCreateController.js";
//marketing lesson
import mrlessonService from "../services/mrlessonService.js";
import mrlessonCreateController from "../controllers/mrlessonCreateController.js";
//music lesson
import mslessonService from "../services/mslessonService.js";
import mslessonCreateController from "../controllers/mslessonCreateController.js";
//sport comment
import spcommentController from "../controllers/spcommentController.js";
//marketing comment
import mrcommentController from "../controllers/mrcommentController.js";
//music
import mscommentController from "../controllers/mscommentController.js";
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
router.get("/mrlessons.ejs", async (req, res) => {
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