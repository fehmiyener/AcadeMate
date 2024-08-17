let getPageMarketing = async ( req,res) => {
    return res.render("marketing.ejs");
};

module.exports = {
    getPageMarketing: getPageMarketing,
};