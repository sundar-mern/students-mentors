import { client } from "../db.js";

export function Getstudent() {
    return client.db("guvi").collection("students").find({}).toArray();
}

export function addstudent(data){
    return client.db("guvi").collection("students").insertOne(data)
}



export function getStudentsWithoutMentor() {
    return client.db("guvi").collection("students").find({ currentmentor: null }).toArray();
}

export function getPreviousMentorForStudent(name) {
    return client.db("guvi").collection("students").findOne({ student: name });
}

export function assignMentorToStudent(studname, mentor) {
    return client.db("Guvi").collection("student").updateOne(
        { student: studname },
        { $set: { currentmentor: mentor } }
    );
}
