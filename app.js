import express from "express"
import mysql from "mysql"
import cors from "cors"


const app = express()
const PORT = 3002
app.use(cors())
app.use(express.urlencoded( {
  extended:true
}))
app.use(express.json());
const connection = mysql.createConnection( {
    host: "localhost",
    user: "egzaminas_egzaminas",
    database: "egzaminas",
    password: "egzaminas_egzaminas",
}) 

connection.connect(err => {
    if (err) {
        throw err
    }
    console.log("Prisijungiau");
})

app.get("/cars", (req, res) => {
    connection.query("SELECT * FROM egzaminas.cars order by  id desc", (err, result)=> {
        if (err) {
            throw err
        }
        res.json(result);
    })
})

app.post('/cars', (req, res) => {
    console.log(req.body);
  let sql = `
  INSERT INTO egzaminas.cars
  (plate, weight, pasangers, priority)
   VALUES (?,?,?,?);
  `
  connection.query(sql,[
    req.body.carPlate,
    req.body.carWeight,
    req.body.passengers,
     req.body.priority,
    ], (err,result) => {
    if (err) {console.log(err);}
    res.send(result)
  })
})

app.delete('/cars/:id', (req, res) => {
  let sql = `
    delete from cars
    where id = ?
  `
  connection.query(sql,[req.params.id], (err,result) => {
    if (err) {throw err}
    res.send(result)
    console.log("Deleted");
  })
})

// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;

app.put('/cars/:id', (req, res) => {
    console.log(req.body);
  let sql = `
    update cars
    set  weight = ?, priority = ?
    where id = ?
  `
  connection.query(sql,[
    req.body.newWeight,
    req.body.newPriority,
    req.params.id,
    ], (err,result) => {
    if (err) {console.log(err) }
    res.send(result)
    console.log("updadddted!");
  })
})



app.get("/cars/count", (req, res) => {
    connection.query("SELECT COUNT(id) as carsCount FROM cars", (err, result)=> {
        if (err) {
            throw err
        }
        res.json(result);
    })
})



app.get("/cars/totalWeight", (req, res) => {
    connection.query("SELECT SUM(weight) as totalWeight FROM cars;", (err, result)=> {
        if (err) {
            throw err
        }
        res.json(result);
    })
})


app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`)
})