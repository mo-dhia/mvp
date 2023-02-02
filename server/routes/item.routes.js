const router = require('express').Router();
const { getPrefsById, addPref, deletePref } = require("../controllers/item.controller");

router.route('/prefrences')
    .get((req, res) => {
        getPrefsById(req, res)
    })
    .post((req, res) => {
        addPref(req, res);
    })

module.exports = router;
