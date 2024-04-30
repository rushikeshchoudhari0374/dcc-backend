
class AccessControl{

    static isAdmin = (req,res,next) => {
        const role = req.user.role;
        if (role==="admin") {
            next();
        }
        else{
            return res.status(401).send();
        }
    }

    static isManager = (req,res,next) => {
        const role = req.user.role;
        if (role==="manager") {
            next();
        }
        else{
            return res.status(401).send();
        }
    }

    static isSiteEng = (req,res,next) => {
        const role = req.user.role;
        if (role==="site-engineer") {
            next();
        }
        else{
            return res.status(401).send();
        }
    }

    static isClient = (req,res,next) => {
        const role = req.user.role;
        if (role==="client") {
            next();
        }
        else{
            return res.status(401).send();
        }
    }

    static isAdminManager = (req,res,next) => {
        const role = req.user.role;
        if (role==="admin" || role==="manager") {
            next();
        }
        else{
            return res.status(401).send();
        }
    }

    static isAdminManagerSiteEng = (req,res,next) => {
        const role = req.user.role;
        if (role==="admin" || role==="manager" || role==="site-engineer") {
            next();
        }
        else{
            return res.status(401).send();
        }
    }

    static isAdminManagerClient = (req,res,next) => {
        const role = req.user.role;
        if (role==="admin" || role==="manager" || role==="client") {
            next();
        }
        else{
            return res.status(401).send();
        }

    }

}


export default AccessControl