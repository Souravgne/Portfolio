const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

router.use(auth);

// For creating a project with an image
router.post('/', upload.single('image'), createProject);

// For updating project with optional new image
router.put('/:id', upload.single('image'), updateProject);

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.delete('/:id', deleteProject);

module.exports = router;
