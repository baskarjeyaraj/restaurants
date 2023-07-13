module.exports = (app) => {
    require("./Restaurant/restopr/index")(app); 
    require("./UsersManagment/useropr/index")(app);  
    
}