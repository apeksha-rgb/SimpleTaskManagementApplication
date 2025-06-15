import express from "express"
import cors from "cors"
const app = express();
const PORT = 5000;

app.use(cors())
app.use(express.json())

let tasks = []
let idCounter = 1

app.get('/tasks', (req,res) => {
    res.json(tasks);
})

app.post('/tasks',(req,res)=>{
    const {name, description} = req.body;
    if(!name || !description) return res.status(400).json({error:"missing fields"})
    const newTask = {id: idCounter++,name,description}
    tasks.push(newTask)
    res.status(201).json(newTask)
})

app.put('/tasks/:id',(req,res)=>{
    const {id} = req.params
    const {name,description} = req.body
    const task = tasks.find(t=>t.id === parseInt(id))
    if(!task) return res.status(404).json({error:"Task not found"})
    task.name = name
    task.description=description
    res.json(task)
    

})

app.delete('/tasks/:id',(req,res)=>{
    console.log("Delete request for ID:", req.params.id)
    const taskId = parseInt(req.params.id)
    if(isNaN(taskId)){
        return res.status(400).json({error:'Invalid ID'})
    }
    const index = tasks.findIndex(t => t.id === taskId)

    if(index === -1){
        return res.status(404).json({error : "Task not found"})
    }
    tasks.splice(index,1)
    res.status(200).json({message: "Task deleted successfully"})

})

app.listen(PORT,()=>console.log(`server running on port ${PORT}`))