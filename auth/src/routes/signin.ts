import express from "express"


const router = express.Router()


router.get("/api/users/signin", (req, res, next) => {
    res.status(200).send({"message": "Sign In"})
})


export { router as signInRouter }