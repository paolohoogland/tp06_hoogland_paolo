module.exports = app => {
    require("./productRoutes")(app);
    require("./userRoutes")(app);
}