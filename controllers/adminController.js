const { decryptString } = require("../helpers/authHelper");


exports.check = async (req, res) => {
  const data =   decryptString('8dba5697b131988534dd1405fcd414562864eddddefe153d3e8375d7e3211531')
    return res.status(200).json({ msg: 'Admin route successfully access ', data: data });
};


