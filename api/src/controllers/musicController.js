let getPageMusic = async ( req,res) => {
    return res.render("music.ejs");
};

module.exports = {
    getPageMusic: getPageMusic,
};