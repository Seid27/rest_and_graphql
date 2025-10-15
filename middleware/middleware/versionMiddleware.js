export default function versionMiddleware (req,res, next) {
    console.log("in version middleware...",req.query.version);
    
    switch (req.query.version) {
        case '1':
            req.apiVersion = '1';
            next();
            break;
        case '2':
            req.apiVersion = '2';
            next();
            break;
        default:
            res.status(400).json({success: false, message: "Invalid API version"});
            break;
    }
}