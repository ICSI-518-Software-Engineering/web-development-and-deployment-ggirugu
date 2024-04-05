require('dotenv').config({ path: './server.env' });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const AWS = require('aws-sdk');
const path = require('path');
console.log(process.env.MONGO_URI);
const multer = require('multer');
const { request } = require('http');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); // Destination directory for uploaded files

const app = express();
const port = 8080;
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Define the User schema
const userSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Pre-save hook to hash password
userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    bcrypt.hash(this.password, saltRounds, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

// Compile model from schema
const User = mongoose.model('User', userSchema);

// MongoDB setup
mongoose.connect(process.env.MONGO_URI);
const Product = mongoose.model('Product', new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    imageUrl: String
}));

// AWS S3 setup
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});
const s3 = new AWS.S3();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// Addition API
app.post('/add', (req, res) => {
    const { number1, number2 } = req.body;
    const result = Number(number1) + Number(number2);
    res.json({ result });
});

// Endpoint for generating pre-signed URL
app.get('/generate-presigned-url', (req, res) => {
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: `${process.env.S3_FOLDER}/${Date.now()}_${req.query.fileName}`,
        Expires: 60, // URL expiry time
        ContentType: req.query.fileType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', params, (err, url) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({ url });
    });
});

app.post('/upload-image', upload.single('image'), async (req, res) => {
    try {
        // Check if req.file is defined
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log('File information:', req.file);

        // Ensure req.file.buffer is defined and contains the file buffer
        if (!req.file.buffer || !Buffer.isBuffer(req.file.buffer)) {
            return res.status(400).json({ error: 'File buffer is missing or invalid' });
        }

        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: `${process.env.S3_FOLDER}/${Date.now()}_${req.file.originalname}`,
            Body: req.file.buffer, // Image file buffer
            ACL: 'public-read' // Make uploaded object publicly accessible
        };

        // Upload image to S3
        const data = await s3.upload(params).promise();
        const imageUrl = data.Location;

        res.json({ imageUrl }); // Return URL of uploaded image
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Error uploading image' });
    }
});


app.get('/products', async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();
        res.json(products); // Send the products as a JSON response
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// Endpoint for adding a product
app.post('/add-product', async (req, res) => {
    try {
        const { name, price, quantity, imageUrl } = req.body;
        const product = new Product({ name, price, quantity, imageUrl });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Check if the product exists
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        // If the product exists, delete it
        await Product.findByIdAndDelete(id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Error deleting product' });
    }
});

// Endpoint for updating a product
app.put('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, quantity } = req.body;

        // Check if the product exists
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update the product
        product.name = name;
        product.price = price;
        product.quantity = quantity;
        await product.save();

        res.json(product); // Return the updated product
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Error updating product' });
    }
});
app.post('/signup', async (req, res) => {
    try {
        const { studentName, studentId, email, password } = req.body;

        // Basic validation
        if (!studentName || !studentId || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if a user with the given studentId or email already exists
        const existingUser = await User.findOne({ $or: [{ studentId }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'A user with the given ID or email already exists.' });
        }

        // Create a new user and save to the database
        const newUser = new User({ studentName, studentId, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/signin', async (req, res) => {
    try {
        const { studentId, password } = req.body;

        // Basic validation
        if (!studentId || !password) {
            return res.status(400).json({ message: 'Student ID and password are required.' });
        }

        // Find the user by studentId
        const user = await User.findOne({ studentId });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Return user data (excluding the password)
        const userData = {
            studentId: user.studentId,
            studentName: user.studentName,
            email: user.email
            // Add other fields as necessary
        };

        res.json(userData);
    } catch (error) {
        console.error('Error in signin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.get('/', (req, res) => {
    res.send('Hello from Product Management Server!');
});

app.get("*", (req, res) => {
    res.sendFile(path.join(path.join(__dirname, 'build'), 'index.html'));
});

app.listen(port, () => {

    console.log(`Server running on http://localhost:${port}`);
});
