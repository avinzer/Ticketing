import express from "express"


const router = express.Router()


router.get("/api/users/signout", (req, res, next) => {
    res.status(200).send({"message": "Sign Out"})
})


export { router as signOutRouter }