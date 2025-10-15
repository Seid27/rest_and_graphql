import express from 'express';
const router = express.Router();
import users from "../../data/users.js";

router.get('/users', (req,res)=>{
    res.json({succss: true, version: 1, data: users})
});

export default router;