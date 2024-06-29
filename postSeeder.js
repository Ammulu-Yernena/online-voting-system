const mongoose = require('mongoose');
const Post = require('./models/post'); // Adjust the path to your Post model

const postData = [
  {
    title: 'BJP',
    photo: '/images/bjp.jpg', // Example path to an image
    postedBy: 'Admin', // Example of who posted it
  },
  {
    title: 'Congress',
    photo: '/images/congress.jpg', // Example path to an image
    postedBy: 'Admin', // Example of who posted it
  },
  {
    title: 'NOTA',
    photo: '/images/nota.jpg', // Example path to an image
    postedBy: 'Admin', // Example of who posted it
  },
];

// Function to seed posts into the database
const seedPosts = async () => {
  try {
    await Post.deleteMany(); // Clear existing posts
    const createdPosts = await Post.insertMany(postData); // Insert new posts
    console.log('Posts seeded successfully:', createdPosts);
    mongoose.connection.close(); // Close the MongoDB connection after seeding
  } catch (err) {
    console.error('Error seeding posts:', err);
  }
};

seedPosts();
