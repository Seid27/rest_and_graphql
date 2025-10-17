import express from 'express';
import users from "./data/users.js";
import headerMiddleware from './middleware/headerMiddleware.js';

const app = express();
app.listen(3000, console.log('Server running on port 3000'));
app.use(headerMiddleware);

//header versioning using middleware
app.get('/users', (req,res,next)=>{
    if (req.apiVersion === '1') {
        res.status(200).json({success: true, version: 1, data: users});
    } 
    else if (req.apiVersion === '2') {
        const v2Users = users.map(u => ({
            id: u.id,
            full_name: `${u.first_name} ${u.last_name}`
          }));
        res.json({success: true, version: 2, data: v2Users});
    }
})

// =======================================================================
//NOTE:
// header versioning without middleware
// app.get('/users', (req,res,next)=>{
//     const acceptHeader = req.headers.accept;
    
//     //if (acceptHeader === 'application/vnd.example.v1+json')
//     // Accept header might contain multiple MIME types
//     //safer to use .includes() instead of strict equality
//     if (acceptHeader?.includes('application/vnd.example.v1+json')){
//         res.status(200).json({ success: true, version: 1, data: users });
//     }
//     else if (acceptHeader?.includes('application/vnd.example.v1+json')){
//         const v2Users = users.map(u => ({
//             id: u.id,
//             full_name: `${u.first_name} ${u.last_name}`
//           }));
//         res.status(200).json({success: true, version: 2, data: v2Users});
//     }
//     else{
//         //406 Not Acceptable — means “the server cannot produce a representation matching the request’s Accept headers.”
//         res.status(406).json({success: false, msg: 'Invalid version requested'});
//     }
// })
// =======================================================================