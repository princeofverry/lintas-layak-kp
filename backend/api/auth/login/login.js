const User = require('../../../models/user');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Cari user berdasarkan username atau email
    const user = await User.findOne({ $or: [{ name }, { email }] });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Input Credential' });
    }

    // Cocokkan password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Input Credential' });
    }

    res.status(200).json({ msg: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
