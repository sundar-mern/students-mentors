import { client } from "../db.js";

export function Getmentor() {
    return client.db("guvi").collection("mentors").find({}).toArray();
}

export function addmentor(data){
    return client.db("guvi").collection("mentors").insertOne(data)
}

export function getStudentsForMentor(id) {
    return client.db("guvi").collection("mentors").find({ mentor: id }).toArray();
}