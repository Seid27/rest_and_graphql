
export default function headerMiddleware(req,res,next) {
    const acceptHeader = req.headers.accept;
    // this implementation contains fallback incase the client doesnot provide a desired version
    // or accept is '*/*' wildcard.
    // +json This version of my API returns representations formatted as JSON
    // could also be +xml
    if (!acceptHeader || acceptHeader === '*/*' || acceptHeader.includes('application/vnd.example.v1+json') 
        ||  acceptHeader.includes('application/json')) {
        req.apiVersion = '1';
        next();
    } 
    else if (acceptHeader.includes('application/vnd.example.v2+json')){
        req.apiVersion = '2';
        next();
    }
        
    else {
        res.status(406).json({success: false,msg: 'Invalid version'})
    }

    // =======================================================================================================
    // NOTE:
    //this implementation is strict equality but 
    //the Accept header might contain multiple MIME types, like: 
    // application/vnd.example.v1+json, text/plain, */*
    // switch (acceptHeader) {
    //     case 'application/vnd.example.v1+json':
            

    //     case 'application/vnd.example.v2+json':
    //         req.apiVersion = '2';
    //         next();
    //         break;
    //     default:
    //         res.status(406).json({success: false,msg: 'Invalid version'})
    // }
}