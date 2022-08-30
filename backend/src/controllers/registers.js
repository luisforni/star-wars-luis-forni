import { connect } from '../database'

export const getRegisters = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query('SELECT * FROM registers')
    res.json(rows)
};

export const getRegister= async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM registers WHERE id = ?', [
        req.params.id,
    ]);
    res.json(rows[0]);
};

export const getRegisterCount = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT COUNT(*) FROM registers')
    res.json(rows[0]["COUNT(*)"]);
};

export const saveRegister = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query("INSERT INTO registers(first_name, last_name, date_birth, phone, country, email, star_wars) VALUES (?,?,?,?,?,?,?)", [
        req.body.first_name, 
        req.body.last_name, 
        req.body.date_birth, 
        req.body.phone, 
        req.body.country, 
        req.body.email, 
        req.body.star_wars
    ])
    
    res.json({
        id: results.insertId,
        ...req.body,
    })
};

export const deleteRegister = async (req, res) => {
    const connection = await connect();
    await connection.query("DELETE FROM registers WHERE id = ?", [
        req.params.id,
    ]);
    res.sendStatus(204);
};

export const updateRegister = async (req, res) => {
    const connection = await connect();
    await connection.query('UPDATE registers SET ? WHERE id = ?', [
        req.body,
        req.params.id
    ]);
    res.sendStatus(204);
};