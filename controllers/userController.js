const { Auth } = require('../models');

exports.getProfile = async (req, res) => {
    try {
        const { userId } = req;
        // Find the user by ID
        console.log(userId)
        const user = await Auth.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Exclude sensitive data before sending response
        const { password, ...userData } = user.toJSON();
        res.status(200).json({ data: userData });
    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { email, username, phoneNumber, gender, dob, hobbies, address } = req.body;
        const { userId } = req; // Assuming userId is available in the request (e.g., from a JWT token)

        if (!email && !username && !phoneNumber && !gender && !dob && !hobbies && !address) {
            return res.status(400).json({ error: 'At least one field is required to update' });
        }

        const user = await Auth.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the fields if provided
        if (email) user.email = email;
        if (username) user.username = username;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (gender) user.gender = gender;
        if (dob) user.dob = dob;
        if (hobbies) user.hobbies = hobbies;
        if (address) user.address = address;

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', data: user });
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
