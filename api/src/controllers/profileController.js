import myCoursesService from "../services/myCoursesService";
import userService from "../services/userService";
import bcrypt from 'bcrypt';

let getPageProfile = async (req, res) => {
    try {
        let balance = await userService.getUserBalance(req.user.id);
        if (balance === null) {
            return res.status(404).send("User balance not found");
        }
        let courses = await myCoursesService.getUserCourses(req.user.id);
        return res.render("profile.ejs", {
            user: req.user,
            balance: balance,
            courses: courses
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error loading profile page");
    }
};
 
const addBalance = async (req, res) => {
    try {
        let { userId, amount } = req.body;
        console.log('Received request to add balance:', { userId, amount });

        if (!userId || !amount) {
            console.log('Invalid request data:', { userId, amount });
            return res.status(400).json({ success: false, message: 'Invalid request data' });
        }

        await userService.addUserBalance(userId, amount);
        res.status(200).json({ success: true, message: 'Balance added successfully' });
    } catch (error) {
        console.error('Error in addBalance:', error);
        res.status(500).json({ success: false, message: 'An error occurred', error: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        let { userId, fullname, email } = req.body;
        console.log('Received request to update profile:', { userId, fullname, email });

        if (!userId || !fullname || !email) {
            console.log('Invalid request data:', { userId, fullname, email });
            return res.status(400).json({ success: false, message: 'Invalid request data' });
        }

        await userService.updateUserProfile(userId, fullname, email);
        res.status(200).json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error in updateProfile:', error);
        res.status(500).json({ success: false, message: 'An error occurred', error: error.message });
    }
};

const updatePassword = (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    userService.getUserById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'An error occurred', error: err.message });
                }

                if (!isMatch) {
                    return res.status(400).json({ success: false, message: 'Incorrect current password' });
                }

                const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
                userService.updateUserPassword(userId, hashedNewPassword)
                    .then(() => {
                        res.status(200).json({ success: true, message: 'Password updated successfully' });
                    })
                    .catch(error => {
                        console.error('Error updating password:', error);
                        res.status(500).json({ success: false, message: 'An error occurred', error: error.message });
                    });
            });
        })
        .catch(error => {
            console.error('Error fetching user:', error);
            res.status(500).json({ success: false, message: 'An error occurred', error: error.message });
        });
};


export default {
    getPageProfile,
    addBalance, 
    updateProfile,
    updatePassword
};
