const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();
const port = 3000;
//midle ware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


//routes
app.get('/', async (req, res) => {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
    // const postsWithDate = posts.map(post => ({
    //     ...post,
    //     createdAt: new
    // }))
    res.render('index', { posts });
});

app.get('/compose', (req, res) => {
    res.render('compose');
});
app.post('/compose', async (req, res) => {
    const { title, content } = req.body;
    await prisma.post.create({
        data: {
            title,
            content
        }
    })
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})