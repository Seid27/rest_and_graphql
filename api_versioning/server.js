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
    last_name: 'Stones'
},{
    id: '002',
    first_name: 'Maria',
    last_name: 'Jones'
}];

app.get('/api/v1/users', (req, res)=>{
    console.log(req);
    
    res.status(200).json({success: true, data: users});
});

app.get('/api/v1/users/:id', (req, res)=>{
    const user = users.find(({id})=> parseInt(id) == parseInt(req.params.id));
    if (user) {
        res.status(200).json({success: true, data: user});
    }

    else{
        res.status(404).json({success: false, message: "User not found"});
    }
});

app.post('/api/v1/users',(req,res)=>{
    console.log(req.body);
    users.push(req.body);
    console.log(users);
    res.status(201).json({success: true, data: req.body});
    
});

app.delete('/api/v1/users/:id',(req,res)=>{
    const user_index = users.findIndex(({id}) => parseInt(id) == parseInt(req.params.id));

    if(user_index !== -1){
        users.splice(user_index,1);
        res.status(200).json({message:"User Deleted", id: req.params.id});
    }
    else{
        res.sendStatus(404);
    }
});

app.put('/api/v1/users/:id',(req,res)=>{
    const user_index = users.findIndex(({id}) => parseInt(id) == parseInt(req.params.id));

    if(user_index !== -1){
        users[user_index] = req.body;
        console.log(users);
        res.status(200).json({message:"User Updated", user: users[user_index]});
    }
    else{
        res.sendStatus(404);
    }

})
app.get('/api/v2/users', (req, res)=>{
    res.status(200).json({success: true, data: users});
});

app.get('/api/v1/users/:id', (req, res)=>{
    const user = users.find(({id})=> parseInt(id) == parseInt(req.params.id));
    if (user) {
        res.status(200).json({success: true, data: user});
    }

    else{
        res.status(404).json({success: false, message: "User not found"});
    }
});

app.post('/api/v2/users',(req,res)=>{
    console.log(req.body);
    users.push(req.body);
    console.log(users);
    res.status(201).json({success: true, data: req.body});
    
});

app.delete('/api/v2/users/:id',(req,res)=>{
    const user_index = users.findIndex(({id}) => parseInt(id) == parseInt(req.params.id));

    if(user_index !== -1){
        users.splice(user_index,1);
        res.status(200).json({message:"User Deleted", id: req.params.id});
    }
    else{
        res.sendStatus(404);
    }
});

app.put('/api/v2/users/:id',(req,res)=>{
    const user_index = users.findIndex(({id}) => parseInt(id) == parseInt(req.params.id));

    if(user_index !== -1){
        users[user_index] = req.body;
        console.log(users);
        res.status(200).json({message:"User Updated", user: users[user_index]});
    }
    else{
        res.sendStatus(404);
    }

})

// query parameter
app.get('/api/users', (req, res)=>{
    // if (req.query.version === '1'){
    //     res.status(200).json({success: true, data: users, version: 1});
    // }

    // else if (req.query.version === '2') {
    //     res.status(200).json({success: true, data: users, version: 2});
    // }

    // else{
    //     res.status(400).json({success: false, message: "API does not exist"});
    // }

    //using switch statment
    // !version catches both undefined and '' (empty string)
    if(!version){
        res.status(400).json({success: false, message: "Missing API version"});
    }

    switch (req.query.version) {
        case '1':
            res.status(200).json({success: true, data: users, version: 1});
            break;
        case '2':
            res.status(200).json({success: true, data: users, version: 2});
            break;
        default:
            res.status(400).json({success: false, message: "Invalid API version"});
            break;
    }
});


