import express  from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

const connect = async ()=>{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "test",
        });
        connection.connect(()=>{
            resolve(connection);
        });
    })
} 

const query = async (text,connection)=>{
    return new Promise((resolve, reject) => {
        connection.query(text, function (error, results, fields) {
            console.log(error);
            resolve(results);
        });
    })
} 

const disconnect = async (connection)=>{
    return new Promise((resolve, reject) => {
        connection.end(()=>{
            resolve();
        })
    })
} 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// app.get("/", (req, res) => {

// });

app.post('/getAllPlatforms', async (req,res)=>{
    let connection = await connect();
    let res2 = await query("SELECT * FROM `platform`", connection)
    console.log(res2);
    res.send({platforms: res2});
    await disconnect(connection);
});

app.post('/addPlatform', async (req,res)=>{
    const {chipset, cpu, gpu} = req.body;
    let connection = await connect();
    // let res2 = await query("INSERT INTO `pla`(`user_id`, `name`, `surname`, `age`) VALUES ('"+id+"','"+name+"','"+surname+"','"+age+"')",connection)
    let res2 = await query("INSERT INTO `platform`(`chipset`, `cpu`, `gpu`) VALUES ('" + chipset + "','" + cpu + "','" + gpu + "')",connection);
    console.log(res2);
    res.send({platform: res2});
    await disconnect(connection);
});