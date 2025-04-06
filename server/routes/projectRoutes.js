import express from 'express'
import { createProject,updateProject,deleteProject,findProjectById } from '../MongoActions/ProjectActions.js';


const router = express.Router()


router.get('/',()=>{

})

router.get('/:id',(req,res)=>{
res.send("id")
});

router.post('/',(req,res)=>{
    const body = req.body;
    res.send(body)
})

router.put('/',()=>{

})

router.patch('/',()=>{

})  
router.delete('/:id',()=>{

}) 


export default router;