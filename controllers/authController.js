const { Auth } = require('../models');
const { generateToken } = require('../helpers/authHelper');

exports.registerAuth = async (req, res) => {
    try {
        const { email, password, confirmPassword, role, username, phoneNumber, gender, dob, hobbies, address } = req.body;
        const errors = {};

        // Check for missing fields
        if (!email) errors.email = 'Email is required';
        if (!password) errors.password = 'Password is required';
        if (!confirmPassword) errors.confirmPassword = 'Confirm password is required';
        if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
        if (!role) errors.role = 'Role is required';
        if (!username) errors.username = 'Username is required';
        if (!phoneNumber) errors.phoneNumber = 'Phone number is required';
        if (!gender) errors.gender = 'Gender is required';
        if (!dob) errors.dob = 'Date of birth is required';
        if (!address) errors.address = 'Address is required';

        // Validate role
        if (role && !['Admin', 'Client', 'Monitor'].includes(role)) {
            errors.role = 'Invalid role. Must be one of: Admin, Client, Monitor';
        }

        // Validate phone number
        if (phoneNumber && (!/^\d{10}$/.test(phoneNumber))) {
            errors.phoneNumber = 'Phone number must be exactly 10 digits and numeric';
        }

        // Validate date of birth
        if (dob && isNaN(Date.parse(dob))) {
            errors.dob = 'Invalid date of birth';
        }

        // Validate hobbies (optional: ensure it's an array of strings)
        if (hobbies && (!Array.isArray(hobbies) || !hobbies.every(hobby => typeof hobby === 'string'))) {
            errors.hobbies = 'Hobbies must be an array of strings';
        }

        // Return errors if any
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        // Check if email already exists
        const existingUser = await Auth.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email address already exists' });
        }

        // Create the user
        const authData = await Auth.create({ email, password, role, username, phoneNumber, gender, dob, hobbies, address });
        const authResponse = generateToken(authData);

        res.status(201).json({ message: 'User registered successfully', data: authResponse });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.loginAuth = async (req, res) => {
    try {
        const { email, password } = req.body;
        const auth = await Auth.findOne({ where: { email } });

        if (!auth) {
            return res.status(401).json({ error: 'Invalid email address' });
        }

        if (password !== auth.password) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const authResponse = generateToken(auth);
        res.status(200).json({ status: 200, msg: 'Login successful', data: authResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};