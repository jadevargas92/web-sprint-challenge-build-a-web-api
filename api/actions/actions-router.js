// Write your "actions" router here!
const express = require('express')

const router = express.Router()

const Actions = require('./actions-model')

// [GET] /api/actions *** in server.js we have /api/actions and so we don't need to declare it here*** (Returns an array of actions.)
router.get('/', async (req, res) => {
    Actions.get()
        .then(actions => {
            console.log(actions)
            res.status(200).json(actions)
        }).catch(err => {
            res.status(500).json({ message: "The actions information could not be retrieved" })
        })
})

// [GET] /api/actions:id (Returns the actions object with the specified id)
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Actions.get(id)
        .then(action => {
            if (!action) {
                res.status(404).json({ message: "The action with the specified ID does not exist" })
            } else {
                res.status(200).json(action)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The action information could not be retrieved" })
        })
})

// [POST] /api/actions (Creates an action using the information sent inside the request body.)
router.post('/', async (req, res) => {
    const data = req.body
    if (!data.project_id || !data.description || !data.notes) {
        res.status(400).json({ message: "Please provide a project id, description, and notes for the action" })
    } else {
        Actions.insert(data)
            .then(newAction => {
                res.status(201).json(newAction)
            })
            .catch(err => {
                res.status(500).json({ message: "There was an error while saving the action to the database" })
            })
    }

})

// [PUT] /api/actions:id (Updates the actions with the specified id using data from the request body. Returns the modified action)
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const changes = req.body

    try {
        if (!changes.description || !changes.notes) {
            res.status(400).json({ message: "Please provide description and notes for the action" })
        } else {
            const updatedAction = await Actions.update(id, changes)
            if (!updatedAction) {
                res.status(404).json({ message: "The action with the specified ID does not exist" })
            } else {
                res.status(200).json(updatedAction)
            }
        }
    } catch (err) {
        res.status(500).json({ message: "The action information could not be modified" })
    }
})

// [DELETE] /api/actions:id (Removes the action with the specified id and returns no response body)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedAction = await Actions.remove(id)
        if (!deletedAction) {
            res.status(404).json({ message: "The action with the specified ID does not exist" })
        } else {
            res.status(201).json(deletedAction)
        }

    } catch (err) {
        res.status(500).json({ message: "The action could not be removed" })
    }
})

module.exports = router;