const express = require('express');
const expressHandleBars = require('express-handlebars')

const app = express();

const dinamicTest = [
    "Conquer", "yours", "fears"
]


app.engine('handlebars',expressHandleBars({
    defaultLayout: 'main',
}))

app.set('view engine','handlebars')

app.use(express.static(__dirname+ '/public'))

const PORT = process.env.PORT || 9400;

app.get('/', (req, res) => {
   res.render('home')
});

app.get('/about', (req, res) => {
    const randonQuote = dinamicTest[Math.floor(Math.random()*dinamicTest.length)]
    res.render('about', {quote:randonQuote})
});

app.use(((req, res) => {
    res.status(404)
    res.render('404')
}));

app.use(((req, res) => {
    res.status(500)
    res.render('500')
}));

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
