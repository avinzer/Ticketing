import express from "express"


const router = express.Router()


router.get("/api/users/currentuser", (req, res, next) => {
    res.status(200).send({"message": "current User"})
})


export { router as currentUserRouter }