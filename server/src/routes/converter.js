const { response } = require("express");
const express = require("express");
var request = require("request");
var fs = require("fs");

const router = express.Router();

router.post("/", (req, res, next) => {
  const musics = req.body.musics;

  request(
    {
      url: musics[0],
    },
    (err, response, body) => {
      console.log(response.statusCode);
      var parser = new mm(fs.createReadStream("sample.mp3"));
      parser.on("metadata", function (result) {
        console.log(result);
      });
      process.exit(0);
    }
  );

  res.status(200).json({
    ok: true,
    message: "Request executed successfully",
    musics,
  });
});

module.exports = router;
