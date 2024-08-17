import myCoursesService from "../services/myCoursesService";
import userService from "../services/userService"; // Ensure this import is correct

let getUserCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const courses = await myCoursesService.getUserCourses(userId);
        const balance = await userService.getUserBalance(userId); // Fetch user balance
        res.render("mycourses.ejs", { courses: courses, balance: balance }); // Pass balance to the template
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving user's courses");
    }
};

const payForCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const { amount } = req.body;

        // Get current balance
        const currentBalance = await userService.getUserBalance(userId);

        // Check if balance is sufficient
        if (currentBalance < amount) {
            return res.status(400).json({ success: false, message: "Insufficient balance." });
        }

        // Deduct the amount from balance
        await userService.addUserBalance(userId, -amount); // Deducting the amount

        // Get new balance
        const newBalance = await userService.getUserBalance(userId);

        return res.status(200).json({ success: true, newBalance });
    } catch (error) {
        console.error('Error in payForCourses:', error);
        return res.status(500).json({ success: false, message: "An error occurred.", error: error.message });
    }
};

export default {
    payForCourses
};

module.exports = {
    getUserCourses,
    payForCourses
};