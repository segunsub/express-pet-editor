const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const methodOverride = require('method-override')

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})
app.use(express.urlencoded({extended: false}))
app.set("view engine", 'ejs')
app.use(methodOverride('_method'))

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
let id = 3
app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})
app.use("/pets/:id",(req,res,next) => {
    let id_Found = pets.find(pet => pet.id == req.params.id)
    req.id_Found = id_Found
   next()
})

app.get('/', (req, res) => {
  res.render("home.ejs", {pets})
})

app.get('/pets', (req, res) => {
  res.redirect('/')
})

app.get('/pets/:id',(req, res) => {
  //if a card is clicked on it leads here
  const obj = req.id_Found
  res.render("pet", {obj})
})

app.get('/pets/:id/edit', (req, res) => {
  const obj = req.id_Found
  res.render("edit", {obj})
})

app.patch('/pets/:id', (req, res) => {
  //edit each info and return them to home page with updated info
  const obj = req.id_Found
  obj.likes = 0
  const info = Object.keys(req.body)
  info.forEach(data => {
   obj[data] = req.body[data]
  })
  res.redirect('/')
})

app.get('/pets/:id/like',(req,res) => {
  //every like leads here
  req.id_Found.likes++
  res.redirect("/")
})

app.get('/addPet',(req,res) => {
  //New pet to be added
  res.render("addpet")
})

app.post('/',(req,res) => {
  //New pet to be added
  id++
  req.body.likes = 0
  req.body.id = id
  pets.push(req.body)
  res.redirect("/")
})

app.get("*", (req, res) => {
  res.render("notfound.ejs", {title: "Not Found"})
})