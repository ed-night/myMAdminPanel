import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";

let jsonData = {};

try {
    const data = fs.readFileSync('data.json', 'utf8');
    jsonData = JSON.parse(data);
    // console.log(jsonData.platforms);
} catch (error) {
    console.log('Error', error);
}

const app = express();
const port = 3000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

const connect = async () => {
    return new Promise((resolve) => {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "test",
        });
        connection.connect(() => {
            resolve(connection);
        });
    });
}

const query = async (text, connection) => {
    return new Promise((resolve) => {
        connection.query(text, function (error, results) {
            console.log(error);
            resolve(results);
        });
    });
}

const disconnect = async (connection) => {
    return new Promise((resolve) => {
        connection.end(() => {
            resolve();
        });
    });
}

app.post('/addSmartphone', async (req, res) => {
    const { model, brand_id, releaseDate, height, width, depth, screen_size, weight, price, discount, battery_capacity, os_id, platform_id } = req.body;
    const connection = await connect();

    const queryText = `INSERT INTO smartphones (model, brand_id, releaseDate, height, width, depth, screen_size, weight, price, discount, battery_capacity, os_id, platform_id) VALUES ("${model}", ${brand_id}, "${releaseDate}", "${height}", "${width}", "${depth}", "${screen_size}", "${weight}", "${price}", "${discount}", "${battery_capacity}", ${os_id}, ${platform_id})`;
    
    const queryResponse = await query(queryText, connection);
    res.send({success: true});
    await disconnect(connection);
});

app.post('/addOS', async (req, res) => {
    const { name } = req.body;
    const connection = await connect();

    const queryText = `INSERT INTO os (name) VALUES ("${name}")`;
    
    await query(queryText, connection);
    res.send({success: true});
    await disconnect(connection);
});

app.post('/addBrand', async (req, res) => {
    const { name } = req.body;
    const connection = await connect();

    const queryText = `INSERT INTO brands (name) VALUES ("${name}")`;
    
    await query(queryText, connection);
    res.send({success: true});
    await disconnect(connection);
});

app.post('/addPlatform', async (req, res) => {
    const { chipset, cpu, gpu } = req.body;
    const connection = await connect();

    const queryText = `INSERT INTO platforms (chipset, cpu, gpu) VALUES ("${chipset}", "${cpu}", "${gpu}")`;
    
    await query(queryText, connection);
    res.send({success: true});
    await disconnect(connection);
});

app.post('/addColor', async (req, res) => {
    const { model_id, color, color_hex } = req.body;
    const connection = await connect();

    const queryText = `INSERT INTO colors (model_id, color, color_hex) VALUES ("${model_id}", "${color}", "${color_hex}")`;
    
    await query(queryText, connection);
    res.send({success: true});
    await disconnect(connection);
});

app.get('/getAllPlatforms', async (req, res) => {
    const connection = await connect();

    const queryText = `SELECT * FROM platforms`;
    
    const queryResponse = await query(queryText, connection);
    res.send({ platforms: queryResponse });
    await disconnect(connection);
});

app.get('/getAllOS', async (req, res) => {
    const connection = await connect();

    const queryText = `SELECT * FROM os`;
    
    const queryResponse = await query(queryText, connection);
    res.send({ platforms: queryResponse });
    await disconnect(connection);
});

app.get('/getAllBrands', async (req, res) => {
    const connection = await connect();

    const queryText = `SELECT * FROM brands`;
    
    const queryResponse = await query(queryText, connection);
    res.send({ platforms: queryResponse });
    await disconnect(connection);
});

app.get('/getAllColors', async (req, res) => {
    const connection = await connect();

    const queryText = `SELECT * FROM colors`;
    
    const queryResponse = await query(queryText, connection);
    res.send({ platforms: queryResponse });
    await disconnect(connection);
});

app.get('/getAllSmartphones', async (req, res) => {
    const connection = await connect();

    const queryText = `SELECT * FROM smartphones`;
    
    const queryResponse = await query(queryText, connection);
    res.send({ platforms: queryResponse });
    await disconnect(connection);
});

app.post('/createColorsTable', async (req, res) => {
    const connection = await connect();

    await query(`DROP TABLE IF EXISTS colors;`, connection);

    const queryText = `
    CREATE TABLE colors (
        id INT AUTO_INCREMENT,
        model_id INT,
        color VARCHAR(50),
        color_hex VARCHAR(7),
        PRIMARY KEY (id),
        CONSTRAINT fk_model
            FOREIGN KEY (model_id)
            REFERENCES smartphones (id)
    )`;
    
    await query(queryText, connection);
    res.send({success: true});
    await disconnect(connection);
});

app.post('/createOSTable', async (req, res) => {
    const connection = await connect();

    await query(`DROP TABLE IF EXISTS os`, connection);

    const queryText = `
    CREATE TABLE os (
        id INT AUTO_INCREMENT,
        name VARCHAR(111),
        PRIMARY KEY (id)
    )`;
    
    await query(queryText, connection);
    res.send({success: true});
    await disconnect(connection);
});

app.post('/createPlatformsTable', async (req, res) => {
    const connection = await connect();

    await query(`DROP TABLE IF EXISTS platforms`, connection);

    const queryText = `
    CREATE TABLE platforms (
        id INT AUTO_INCREMENT,
        chipset VARCHAR(333),
        cpu VARCHAR(333),
        gpu VARCHAR(333),
        PRIMARY KEY (id)
    )`;
    
    await query(queryText, connection);
    res.send({success: true});
    await disconnect(connection);
});

app.post('/createBrandsTable', async (req, res) => {
    const connection = await connect();

    await query(`DROP TABLE IF EXISTS brands`, connection);

    const queryText = `
    CREATE TABLE brands (
        id INT AUTO_INCREMENT,
        name VARCHAR(111),
        PRIMARY KEY (id)
    )`;
    
    await query(queryText, connection);
    res.send({success: true});
    await disconnect(connection);
});

app.post('/createSmartphonesTable', async (req, res) => {
    const connection = await connect();

    await query(`DROP TABLE IF EXISTS smartphones`, connection);

    const queryText = `
    CREATE TABLE smartphones (
        id INT AUTO_INCREMENT,
        model VARCHAR(333),
        brand_id INT,
        releaseDate DATE,
        height FLOAT,
        width FLOAT,
        depth FLOAT,
        screen_size FLOAT,
        weight FLOAT,
        price FLOAT,
        discount FLOAT,
        battery_capacity INT,
        os_id INT,
        platform_id INT,
        PRIMARY KEY (id),
        CONSTRAINT fk_os
            FOREIGN KEY (os_id)
            REFERENCES os (id),
        CONSTRAINT fk_platform
            FOREIGN KEY (platform_id)
            REFERENCES platforms (id),
        CONSTRAINT fk_brand
            FOREIGN KEY (brand_id)
            REFERENCES brands (id)
    )`;
    
    await query(queryText, connection);
    res.send({success: true});
    await disconnect(connection);
});

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`);
    try {
        const connection = await connect();
        for (const os of jsonData.os) {
            const { name } = os;
            const queryText = `INSERT INTO os (name) VALUES ("${name}")`;
            await query(queryText, connection);
        }
        await disconnect(connection);
    } catch (err) {
        console.log('Error', err);
    }
});