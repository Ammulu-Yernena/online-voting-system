// const express = require('express')
// const app = express()
// const mongoose  = require('mongoose')
// const cors = require('cors')
// const PORT = process.env.PORT || 5000
// const {MONGO_URI} = require('./keys')

// mongoose.connect(MONGO_URI,{ useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify:false })

// mongoose.connection.on('connected',()=>{
//     console.log("mongodb is connected");
// })

// require('./models/user')
// require('./models/post')
// require('./models/students')

// app.use(express.json())
// app.use(cors())
// // app.use(require('./routes/auth'))
// app.use(require('./routes/post'))
// app.use(require('./routes/user'))
// app.use(require('./routes/student'))


// app.listen(PORT,()=>{
//     console.log("server is running on",PORT)
// })


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGO_URI } = require('./keys');
const app = express();
const PORT = process.env.PORT || 5000;

// Load models
require('./models/post');
require('./models/user');
require('./models/students');

const Post = mongoose.model('Post');

const initialPosts = [
    {
        "title": "BJP",
        "photo": "https://i.pinimg.com/originals/71/eb/2c/71eb2cc75e9615acd590e8b8e3967707.png",
        "postedBy": "admin",
        "votes": []
    },
    {
        "title": "INC",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Indian_National_Congress_hand_logo.svg/1200px-Indian_National_Congress_hand_logo.svg.png",
        "postedBy": "admin",
        "votes": []
    },
    {
        "title": "CPI",
        "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUxiTRIlEU6uj4fXyplyNgMGER7hp2dchgMg&s",
        "postedBy": "admin",
        "votes": []
    },
    {
        "title": "NOTA",
        "photo": "https://images.indianexpress.com/2015/09/nota-symbol759.jpg",
        "postedBy": "admin",
        "votes": []
    }
];

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', async () => {
    console.log("MongoDB connected");

    try {
        const existingPosts = await Post.find({});
        if (existingPosts.length === 0) {
            await Post.insertMany(initialPosts);
            console.log('Initial posts inserted');
        }
    } catch (err) {
        console.error('Error inserting initial posts:', err);
    }
});

mongoose.connection.on('error', (err) => {
    console.log("Error connecting to MongoDB:", err);
});

app.use(express.json());
app.use(cors());

app.use(require('./routes/post'));
app.use(require('./routes/user'));
app.use(require('./routes/student'));

app.listen(PORT, () => {
    console.log("Server is running on", PORT);
});
