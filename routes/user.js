const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')

const { user } = new PrismaClient()

router.get('/', async(req, res) => {
    const users = await user.findMany({
            select: {
                username: true,
                posts: true
            },
            // where: {
            //     username: 'Rub'
            // }
        })
        // return res.status(304).send(users)
    res.json(users)
})

router.post('/', async(req, res) => {
    const { username } = req.body
    const userExists = await user.findUnique({
            where: {
                username
            },
            select: {
                username: true,
                posts: true
            }
        })
        // res.json(userExists)



    if (userExists) {
        return res.status(400).json({
            msg: "user already exists"
        })
    }

    const newUser = await user.create({
        data: {
            username
        }
    })
    res.json(newUser)
})

module.exports = router