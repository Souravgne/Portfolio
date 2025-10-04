const UserDetails = require('../models/UserDetails');

exports.createOrUpdateUserDetails = async (req, res) => {
  const userId = req.user.userId;  // Assuming you have auth middleware setting req.user
  const { fullName, email, phone, address, bio } = req.body;

  let resumeUrl;
  if (req.file) {
    resumeUrl = `/uploads/resumes/${req.file.filename}`;
  }

  try {
    let userDetails = await UserDetails.findOne({ userId });

    if (userDetails) {
      // Update existing
      userDetails.fullName = fullName;
      userDetails.email = email;
      userDetails.phone = phone;
      userDetails.address = address;
      userDetails.bio = bio;
      if (resumeUrl) userDetails.resumeUrl = resumeUrl;

      await userDetails.save();
    } else {
      // Create new
      userDetails = new UserDetails({
        userId,
        fullName,
        email,
        phone,
        address,
        bio,
        resumeUrl,
      });
      await userDetails.save();
    }

    res.json(userDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserDetails = async (req, res) => {
  const userId = req.user.userId;
  try {
    const userDetails = await UserDetails.findOne({ userId });
    if (!userDetails) return res.status(404).json({ message: 'User details not found' });
    res.json(userDetails);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
