const router = require('express').Router()

const { PrismaClient } = require('@prisma/client')

const { post, user } = new PrismaClient()

router.post('/', async(req, res) => {
    const { title, content, user_id } = req.body
    const userExists = await user.findUnique({
        where: {
            id: user_id
        }
    })

    if (!userExists) {
        return res.status(400).json({
            msg: 'User not found'
        })
    }
    const newPost = await post.create({
        data: {
            title,
            post: content,
            user_id
        }
    })
    res.json(newPost)
})

router.get('/:user_id', async(req, res) => {
    const posts = await post.findMany({
        where: {
            user_id: parseInt(req.params.user_id)
        },
        select: {
            title: true,
            created_at: true,
            post: true,
            user: true
        }
    })
    res.json(posts)
        // return posts
})



module.exports = router