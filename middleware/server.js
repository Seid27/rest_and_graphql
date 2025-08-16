const express = require('express');
const app = express();
const port = 3000;

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
    
});

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const users = [{
    id: '001',
    first_name: 'John',
    last_name: 'Doe'
},{
    id: '002',
    first_name: 'Maria',
    last_name: 'Jones'
}];

app.get('/users', (req, res)=>{
    res.sendStatus(200).json({success: true, data: users});
});

app.get('/users/:id', (req, res)=>{
    const user = users.find(({id})=> parseInt(id) == parseInt(req.params.id));
    if (user) {
        res.sendStatus(200).json({success: true, data: user});
    }

    else{
        res.sendStatus(404).json({success: false, message: "User not found"});
    }
});

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


