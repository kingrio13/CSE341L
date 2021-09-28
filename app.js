const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  User.findById('6152b121af45fb60f843e89d')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});



app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const cors = require('cors') // Place this with other requires (like 'path' and 'express')

// const corsOptions = {
//     origin: "http://cse341l.herokuapp.com/",
//     optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

// const options = {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     family: 4
// };



const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://kingrio13:UxBxg6zdjTsTy334@cluster0.mc5dh.mongodb.net/test?retryWrites=true&w=majority";



mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'rio',
          email: 'rio@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });


