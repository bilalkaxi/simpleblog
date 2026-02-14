const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
//midle ware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//in memory blog
let posts = [
    {
        title: "Hello",
        content: "WOrld"
    },
]

app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});
app.get('/compose', (req, res) => {
    res.render('compose');
});
app.post('/compose', (req, res) => {
    const post = {
        title: req.body.title,
        content: req.body.content
    };
    posts.push(post);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})