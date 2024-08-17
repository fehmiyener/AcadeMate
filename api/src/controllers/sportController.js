let getPageSport = async ( req,res) => {
    return res.render("sport.ejs");
};

module.exports = {
    getPageSport: getPageSport,
};