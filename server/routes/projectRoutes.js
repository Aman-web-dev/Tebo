import express from "express";
import {
  createProject,
  updateProject,
  deleteProject,
  findProjectById,
  getAllProjects,
} from "../MongoActions/ProjectActions.js";

const router = express.Router();

router.get("/", async(req, res) => {
  const result = await getAllProjects();
  res.send(result);
});

router.get("/:id",async (req, res) => {
  const { id } = req.params;
  const project =await findProjectById(id);
  console.log(id);
  res.send(project);
});

router.post("/", async (req, res) => {
  const { name, description, priority, createdBy} = req.body;
  const result = await createProject({
    name,
    description,
    priority,
    createdBy,
  });
  res.send(result);
});


// PUT (Full Update)
router.put("/:id", async (req, res) => {
    try {
      const updated = await updateProject(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // PATCH (Partial Update)
  router.patch("/:id", async (req, res) => {
    try {
      const updated = await updateProject(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // DELETE
  router.delete("/:id", async (req, res) => {
    try {
      const deleted = await deleteProject(req.params.id);
      res.json(deleted);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default router;
