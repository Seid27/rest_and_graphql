import express from 'express';
const router = express.Router();
import users from "../../data/users.js";

router.get('/users', (req,res)=>{
    const v2Users = users.map(u => ({
        id: u.id,
        full_name: `${u.first_name} ${u.last_name}`
      }));
    res.json({success: true, version: 2, data: v2Users});
});

export default router;