import express from 'express';
const app = express();
const port = 3000;
import versionMiddleware from './middleware/versionMiddleware.js';
import v1 from './routes/v1/users.js'
import v2 from './routes/v2/users.js'

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
    
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(versionMiddleware);

app.get('/users', (req, res, next)=>{
    console.log( "in server", req.query.version);
    
    
    if (req.apiVersion === '1') {
        v1(req,res, next);
    } else if (req.apiVersion === '2') {
        v2(req,res, next);
    }
});

// app.get('/users/:id', versionMiddleware, (req, res)=>{
//     const user = users.find(({id})=> parseInt(id) == parseInt(req.params.id));

    
//     if (user) {
//         res.sendStatus(200).json({success: true, data: user});
//     }

//     else{
//         res.sendStatus(404).json({success: false, message: "User not found"});
//     }
// });

app.post('/users',(req,res)=>{
    console.log(req.body);
    users.push(req.body);
    console.log(users);
    res.sendStatus(201).json({success: true, data: req.body});
    
});

app.delete('/users/:id',(req,res)=>{
    const user_index = users.findIndex(({id}) => parseInt(id) == parseInt(req.params.id));

    if(user_index !== -1){
        users.splice(user_index,1);
        res.sendStatus(200).json({message:"User Deleted", id: req.params.id});
    }
    else{
        res.sendStatus(404);
    }
});

app.put('/users/:id',(req,res)=>{
    const user_index = users.findIndex(({id}) => parseInt(id) == parseInt(req.params.id));

    if(user_index !== -1){
        users[user_index] = req.body;
        console.log(users);
        res.sendStatus(200).json({message:"User Updated", user: users[user_index]});
    }
    else{
        res.sendStatus(404);
    }

})


