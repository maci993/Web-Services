const fs = require("fs");
const makeId = require("../pkg/strings");

const MAX_FILESIZE = 1048576;
const ALLOWED_FILETYPES = [
  "image/jpeg",
  "image/png",
  "image/pjpeg",
  "image/gif",
];

const upload = async (req, res) => {
  console.log("files", req.files);
  if (MAX_FILESIZE < req.files.document.size) {
    return res.status(500).send("File exceeds max file size!");
  }
  if (!ALLOWED_FILETYPES.includes(req.files.document.mimetype)) {
    return res.status(500).send("File type not allowed");
  }

  let userDir = `user_${req.auth.id}`;
  let userDirPath = `${__dirname}/../uploads/${userDir}`;
  if (!fs.existsSync(userDirPath)) {
    fs.mkdirSync(userDirPath);
  }

  let fileName = `${makeId(6)}_${req.files.document.name}`;
  let filePath = `${userDirPath}/${fileName}`;

  req.files.document.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send("internal Server Error!");
    }
    return res.status(201).send({ file_name: fileName });
  });
};

const download = async (req, res) => {
  let userDir = `user_${req.auth.id}`;
  let userDirPath = `${__dirname}/../uploads/${userDir}`;
  let filePath = `${userDirPath}/${req.params.fileName}`;
  if (!fs.existsSync(filePath)) {
    return res.status(400).send("File not found!");
  }
  res.download(filePath);
};

const listFilesForUser = async (req, res) => {
  let userDir = `user_${req.auth.id}`;
  let userDirPath = `${__dirname}/../uploads/${userDir}`;
  // let filePath = `${userDirPath}/${req.params.fileName}`;

  fs.readdir(userDirPath, (err, files) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    }
    // let files = files.map((file) => file);
    res.status(200).send(files);
  });
};

const removeFiles = async (req, res) => {
  let userDir = `user_${req.auth.id}`;
  let userDirPath = `${__dirname}/../uploads/${userDir}`;
  let filePath = `${userDirPath}/${req.params.fileName}`;
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File Not Found!");
  }
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).send("Internal Server Error!");
    }
    fs.readdir(userDirPath, (err, files) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      }
      if (files.length === 0) {
        fs.rmdir(userDirPath, (err) => {
          if (err) {
            return res.status(500).send("Internal Server Error");
          }
          res.status(200).send("File and empty directorium deleted!");
        });
      } else {
        return res.status(200).send("File deleted successfully!");
      }
    });
  });
};
module.exports = {
  upload,
  download,
  listFilesForUser,
  removeFiles,
};
