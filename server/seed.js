const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
require('dotenv').config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pet-ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Sample users
    const users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 10),
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: await bcrypt.hash('password123', 10),
      },
    ];

    await User.insertMany(users);
    console.log('Users seeded');

    // Sample products
    const products = [
      {
        name: 'Premium Dry Dog Food',
        description: 'Nutritious dry dog food for all breeds, rich in protein and vitamins',
        price: 29.99,
        category: 'Food',
        image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&h=200&fit=crop',
        stock: 50,
      },
      {
        name: 'Dog Leash and Collar Set',
        description: 'Durable leash and collar set for medium to large dogs',
        price: 19.99,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop',
        stock: 75,
      },
      {
        name: 'Dog Bed for Large Breeds',
        description: 'Comfortable orthopedic bed for large dogs',
        price: 89.99,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=300&h=200&fit=crop',
        stock: 25,
      },
      {
        name: 'Interactive Dog Toy',
        description: 'Puzzle toy to keep your dog entertained and mentally stimulated',
        price: 14.99,
        category: 'Toys',
        image: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=300&h=200&fit=crop',
        stock: 60,
      },
      {
        name: 'Dog Grooming Brush',
        description: 'Professional grooming brush for all coat types',
        price: 12.99,
        category: 'Grooming',
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop',
        stock: 40,
      },
      {
        name: 'Cat Toy Ball',
        description: 'Fun ball toy for cats',
        price: 5.99,
        category: 'Toys',
        image: 'https://via.placeholder.com/300x200?text=Cat+Toy',
        stock: 100,
      },
      {
        name: 'Bird Cage',
        description: 'Spacious cage for pet birds',
        price: 49.99,
        category: 'Accessories',
        image: 'https://via.placeholder.com/300x200?text=Bird+Cage',
        stock: 20,
      },
      {
        name: 'Fish Tank',
        description: 'Beautiful aquarium for fish',
        price: 79.99,
        category: 'Aquarium',
        image: 'https://via.placeholder.com/300x200?text=Fish+Tank',
        stock: 10,
      },
      {
        name: 'Hamster Wheel',
        description: 'Exercise wheel for hamsters',
        price: 12.99,
        category: 'Toys',
        image: 'https://via.placeholder.com/300x200?text=Hamster+Wheel',
        stock: 30,
      },
      {
        name: 'Pet Shampoo',
        description: 'Gentle shampoo for all pets',
        price: 9.99,
        category: 'Grooming',
        image: 'https://via.placeholder.com/300x200?text=Pet+Shampoo',
        stock: 40,
      },
    ];

    await Product.insertMany(products);
    console.log('Products seeded');

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
