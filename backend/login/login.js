const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Model User
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model('User', UserSchema);

// Controller for login
const login = async (req, res) => {
  const { email, password } = req.body; // Removed name from here, it's unnecessary

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    res.status(200).json({ msg: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { login, User };
