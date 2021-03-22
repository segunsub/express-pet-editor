const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})

let pets = [
  {
    id: 1,
    species: "Dog",
    name: "Fido", 
    age: "5 years",
    notes: "Cute guy",
    likes: 0
  },
  {
    id: 2,
    species: "Cat",
    name: "Fluffy", 
    age: "8 months",
    notes: "Adorable girl",
    likes: 0
  },
  {
    id: 3,
    species: "Bird",
    name: "Polly", 
    age: "3 years",
    notes: "Lovable fellow",
    likes: 0
  },
]

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

app.get('/', (req, res) => {
  res.render("home.ejs", {pets})
})

app.get('/pets', (req, res) => {
  res.redirect('/')
})

app.get("*", (req, res) => {
  res.render("notfound.ejs", {title: "Not Found"})
})