import express from "express"


const router = express.Router()


router.get("/api/users/signout", (req, res, next) => {
    req.session = null

    res.send({})
})


export { router as signOutRouter }