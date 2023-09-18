let getHomepage = async (req, res) => {
    try {
        return res.send("Hello, here's dqhuy's accessories_server!");
    } catch (error) {
        console.log(error);
    }
};

export default {
    getHomepage,
};
