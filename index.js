const express = require('express')
//const morgan = require('morgan')
const cors = require('cors')
const app = express()

//app.use(express.json())

//let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
//app.use(morgan('combined', {stream: accessLogStream}))

app.use(cors())
app.use(express.static('dist'))

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        //response.json(person)
        response.send(`<p>${person.name}</p><p>${person.number}</p>`)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {  
    const body = request.body
    if(!body.name){
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if(!body.number){
        return response.status(400).json({
            error: 'number missing'
        })
    }
    const person = {
        id: Math.floor(Math.random()*100),
        name: body.name,
        number: String(body.number),
    }
    persons = persons.concat(person)
    response.json(person)
})

app.get('/info', (request, response) => {
    const datetime = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${datetime}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})