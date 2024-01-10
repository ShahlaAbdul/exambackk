import express from 'express'
const app = express()
const port = 3300
import mongoose, { Schema } from 'mongoose';
import cors from "cors";

app.use(express.json())
app.use(cors())
const dataSchema = new Schema({
    name: String,
    image: String,
    description: String
});

const dataModel = mongoose.model('Data', dataSchema);

app.get('/', async (req, res) => {
    try {
        const data = await dataModel.find({})
        res.send(data)
    }
    catch (error) {
        res.send(error.message)
    }
})

app.get('/:id', async (req, res) => {
    try {
        const {id}= req.params
        const datas= await dataModel.findById(id)
        res.send(datas)
    } catch (error) {
        res.send(error.message)

    }
})

app.post('/', async (req, res) => {
    try {
        const { name, image, description } = req.body
        const newData= new dataModel({ name, image, description });
        await newData.save()
        res.send(newData)
    } catch (error) {
        res.send(error.message)
    }
})

app.put('/:id',async (req, res) => {
    try {
        const {id}=req.params
        const { name, image, description } = req.body
        const newData= await dataModel.findByIdAndUpdate(id)
        res.send("put methodu") 
    } catch (error) {
        res.send(error.message)

    }
})
app.delete('/:id', async (req, res) => {
    try {
     const {id}= req.params
     const newData=await carModel.findByIdAndDelete(id)
     res.send('delete methodu ugurlu')
    } catch (error) {
     res.send(error.message)
    }
 })
 mongoose.connect('mongodb+srv://Shahla:sehla200415@mycluster.vpdzf3b.mongodb.net/')
 .then(() => console.log('Connected!'))
 .catch(()=>console.log('not connected'));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})