const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());


const users = [
  {username: "Baljeet",
  password: "test1234",
  user: "seller"
  },
  {username: "Shreya",
  password: "test1234",
  user: "buyer"
  },
];
const products = [];
const orders = [];
const sellers = [
  { id: 1, name: 'Seller 1' },
  { id: 2, name: 'Seller 2' },
];
const sellerCatalogs = [
  { sellerId: 1, items: [{ id: 1, name: 'apple', price: 500}, { id: 2, name: 'microsoft', price: 900 }] },
  { sellerId: 2, items: [{ id: 3, name: 'windows', price: 250 }, { id: 4, name: 'gtae', price: 500 }] },
  { sellerId: 3, items: [{ id: 1, name: 'apple', price: 1000 }, { id: 5, name: 'samsung', price: 2000 }] }
];
const catalogue=[];
const order=[];
app.post('/api/auth/register', (req, res) => {
  const newUser = req.body;
  const { username} = req.body;
  users.push(newUser);
  if(username==="seller"){
    sellers.push(username);
  }
  res.status(201).json(newUser);
});
app.post('/api/seller/create-catalog', (req, res) => {
  const cata = req.body;
  
  catalogue.push(cata);
  
  res.status(201).json(cata);
});
app.post('/api/buyer/create-order/:seller_id', (req, res) => {
  const cata = req.body;
  
  order.push(cata);
  
  res.status(201).json(cata);
});
app.get('/api/seller/orders',(req,res)=>{
  res.json(orders);
});

app.post('/api/auth/login', (req, res) => {

  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Login failed' });
  }
});

app.get('/api/buyer/seller-catalog/:seller_id', (req, res) => {
  const sellerId = parseInt(req.params.seller_id);
  const seller = sellers.find(s => s.id === sellerId);
  if (!seller) {
    return res.status(404).json({ message: 'Seller not found' });
  }

  const sellerCatalog = sellerCatalogs.find(catalog => catalog.sellerId === sellerId);
  if (!sellerCatalog) {
    return res.status(404).json({ message: 'Seller catalog not found' });
  }

  res.json({
    seller: seller,
    catalog: sellerCatalog.items,
  });
});



app.post('/api/products', (req, res) => {

  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});


app.get('/api/products', (req, res) => {
  res.json(products);
});
app.get('/api/buyer/list-of-sellers', (req, res) => {
  res.json(sellers);
});



app.post('/api/orders', (req, res) => {
  const newOrder = req.body;
  orders.push(newOrder);
  res.status(201).json(newOrder);
});


app.get('/api/seller/orders', (req, res) => {
 
  const sellerOrders = orders.filter(order => order.sellerId === req.query.sellerId);
  res.json(sellerOrders);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
