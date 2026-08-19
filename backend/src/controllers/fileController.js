const path = require('path');
const fs = require('fs');
const { File } = require('../models');

exports.upload = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({message: '没有上传文件'});
        }

        const file = await File.create({
            filename: req.file.originalname,
            path: req.file.filename,
            size: req.file.size,
            mimeType: req.file.mimetype,
            noteId: req.body.noteId || null,
            userId: req.userId,
        });

        res.status(201).json(file);
    } catch (err) {
        console.error(err);
        res.status(500).json({message:'服务词错误'});
    }
};

exports.list = async (req, res) => {
    try {
        const files = await File.findAll({
            where:{ userId: req.userId},
            order: [['createdAt', 'DESC']],
        });
        res.json(files);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message:'服务器错误'});
    }
};

exports.download = async (req, res) => {
    try {
        const file = await File.findOne({
            where: {id:req.params.id, userId:req.userId},
        });
        if (!file) {
            return res.status(404).json({message:'文件不存在'});
        }

        const filePath = path.join(__dirname, '../../uploads' , file.path);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({message:'服务器错误'});
        }
        
         res.download(filePath, file.filename);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器错误' });
  }
};

exports.remove = async (req, res) => {
  try {
    const file = await File.findOne({
      where: { id: req.params.id, userId: req.userId },
    });
    if (!file) {
      return res.status(404).json({ message: '文件不存在' });
    }

    const filePath = path.join(__dirname, '../../uploads', file.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await file.destroy();
    res.json({ message: '删除成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器错误' });
  }
};