const express = require('express');
const db = require('./config/db');
const app = express();
var bodyParser = require('body-parser');

require('dotenv').config()
db()
const cors = require('cors');
const corsOpts = {
    origin: '*'
  }
  
const port = process.env.PORT || 8000 

const userRouter = require('./route/users/user.route')
const productRouter = require('./route/products/product.route')
const AddtoCartRoote = require('./route/addtocart/addtocart.route')
const orderRouter = require('./route/order/order.route')

// - -- --- Admin ----//

const adminRoute = require('./route/admin/admin.route')

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.use(cors(corsOpts))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users',userRouter)
app.use('/api/products',productRouter)
app.use('/api/addtocart',AddtoCartRoote)
app.use('/api/orders',orderRouter)

app.use('/',adminRoute)


app.listen(port, ()=> console.log(`listening on ${port}`))