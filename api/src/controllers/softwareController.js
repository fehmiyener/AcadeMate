let getPageSoftware = async ( req,res) => {
    return res.render("software.ejs");
};

module.exports = {
    getPageSoftware: getPageSoftware,
};


