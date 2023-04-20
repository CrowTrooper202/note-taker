const express = require('express');
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 3001

const app = express()

app.get('/api/db', (req, res) => {
    res.status(200).json(`${req.method} request received to get reviews`);
  
    console.info(`${req.method} request received to get reviews`);
  });
  
  app.post('/api/bd', (req, res) => {
    console.info(`${req.method} request received to add a review`);
  
    const { title, text, } = req.body;
  t
    if (title && text) {
      const newReview = {
        title,
        text,
        
      };
  
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedReviews = JSON.parse(data);
  
          parsedReviews.push(newReview);
  
          fs.writeFile(
            './db/reviews.json',
            JSON.stringify(parsedReviews, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated reviews!')
          );
        }
      });
  
      const response = {
        status: 'success',
        body: newReview,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting review');
    }
  });

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/404.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);