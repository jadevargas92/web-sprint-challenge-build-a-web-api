// Write your "projects" router here!
const express = require('express')

const router = express.Router()

const Projects = require('./projects-model')

// [GET] /api/projects *** in server.js we have /api/projects and so we don't need to declare it here*** (Returns an array of projects.)
router.get('/', async (req, res) => {
    Projects.get()
        .then(projects => {
            console.log(projects)
            res.status(200).json(projects)
        }).catch(err => {
            res.status(500).json({ message: "The projects information could not be retrieved" })
        })
})

// [GET] /api/projects:id (Returns the projects object with the specified id)
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Projects.get(id)
        .then(project => {
            if (!project) {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The post information could not be retrieved" })
        })
})

// [POST] /api/projects (Creates a project using the information sent inside the request body.)
router.post('/', async (req, res) => {
    const data = req.body
    if (!data.name || !data.description) {
        res.status(400).json({ message: "Please provide name and description for the project" })
    } else {
        Projects.insert(data)
            .then(newProject => {
                res.status(201).json(newProject)
            })
            .catch(err => {
                res.status(500).json({ message: "There was an error while saving the project to the database" })
            })
    }

})

// [PUT] /api/projects:id (Updates the projects with the specified id using data from the request body. Returns the modified project)
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const changes = req.body

    try {
        if (!changes.name || !changes.description) {
            res.status(400).json({ message: "Please provide name and description for the project" })
        } else {
            const updatedProject = await Projects.update(id, changes)
            if (!updatedProject) {
                res.status(404).json({ message: "The project with the specified ID does not exist" })
            } else {
                res.status(200).json(updatedProject)
            }
        }
    } catch (err) {
        res.status(500).json({ message: "The project information could not be modified" })
    }
})

// [DELETE] /api/projects:id (Removes the project with the specified id and returns no response body)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedProject = await Projects.remove(id)
        if (!deletedProject) {
            res.status(404).json({ message: "The project with the specified ID does not exist" })
        } else {
            res.status(201).json(deletedProject)
        }

    } catch (err) {
        res.status(500).json({ message: "The project could not be removed" })
    }
})

// [GET] /api/projects/:id/actions (Gets the actions for the specified id project)
router.get('/:id/actions', (req, res) => {
    const { id } = req.params;
    Projects.getProjectActions(id)
        .then(project => {
            if (!project) {
                res.status(404).json({ message: "The project with the specified ID does not exist" })
            } else {
                res.status(200).json(project)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The actions information could not be retrieved" })
        })
})

module.exports = router;