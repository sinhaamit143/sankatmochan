require('dotenv').config();
const express = require('express');
const multer = require('multer');
const Blogs = require('../models/blogs.model.js');

const upload = multer({ dest: './uploads/' });

// Create and Save a new blog
exports.create = (req, res) => {
    console.log(req.file);
    // Validate request
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
      }

    // Create a Blog
    const blogs = new Blogs({
        image: `${process.env.BASE_URL}/images/${req.file.filename}`,
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        website: req.body.website
    });

    // Save Blog in the database
    blogs.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Blog."
        });
    });
};

// Retrieve and return all Blogs from the database.
exports.findAll = (req, res) => {
Blogs.find()
    .then(blogs => {
        res.send(blogs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Blog."
        });
    });
};

// // Find a single Blog with a BlogId
exports.findOne = (req, res) => {
Blogs.findById(req.params.blogsId)
    .then(blogs => {
        console.log(blogs)
        if(!blogs) {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.blogsId
            });            
        }
        res.send(blogs);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.blogsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Blog with id " + req.params.blogsId
        });
    });
};

// // Update a Blog identified by the BlogId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.params.blogsId || !req.body.image || !req.body.category || !req.body.title || !req.body.description || req.body.website) {
      return res.status(400).send({
        message: "Blog information cannot be empty"
      });
    }
  
    // Find Blog and update it with the request body
    Blogs.findByIdAndUpdate(req.params.blogsId, {
      $set: {
        image: req.body.image,
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        website: req.body.website
      }
    }, { new: true })
    .then(blogs => {
      if (!blogs) {
        return res.status(404).send({
          message: `Blog not found with id ${req.params.blogsId}`
        });
      }
      res.send(blogs);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Blog not found with id ${req.params.blogsId}`
        });
      }
      return res.status(500).send({
        message: `Error updating Blog with id ${req.params.blogsId}`
      });
    });
  };

// // Delete a Blog with the specified BlogId in the request
exports.delete = (req, res) => {
    Blogs.findByIdAndDelete(req.params.blogsId)
    .then(blogs => {
        if(!blogs) {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.blogsId
            });
        }
        res.send({message: "Blog deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.blogsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Blog with id " + req.params.blogsId
        });
    });
};


// Delete all Blogs from the database.
exports.deleteAll = async (req, res) => {
    try {
        const result = await Blogs.deleteMany({});
        if (result.deletedCount === 0) {
            res.status(404).send({ message: "No Blogs found to delete." });
        } else {
            res.status(200).send({ message: "All Blogs deleted successfully." });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting Blogs."
        });
    }
};