const express = require('express');
const index = require('./public/assets/js/index')

const PORT = process.env.PORT || 3001

const app = express()


app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/404.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);