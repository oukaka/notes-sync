const { Note } = require('../models');

exports.list = async (req, res) => {
    try {
        const notes = await Note.findAll({
        where: {userId: req.userId},
        order: [['updatedAt', 'DESC']],
        });
        res.json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: '服务器错误'});
    }
};

exports.detail = async (req, res) => {
    try {
        const note = await Note.findOne({
            where: {id: req.params.id, userId: req.userId},
        });
        if (!note) {
            return res.status(404).json({message:'笔记不存在'});
        }
        res.json(note);
        } catch (err) {
            console.error(err);
            res.status(500).json({message: '服务器错误'});
        }
    };

exports.create = async (req, res) => {
    try {
        const {title, content, folderId} = req.body;
        const note = await Note.create({
            title,
            content,
            folderId: folderId || null,
            userId: req.userId,
        });
        res.status(201).json(note);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '服务器错误'});
    }
    };

exports.update = async (req, res) => {
    try {
        const note = await Note.findOne({
            where: {id: req.params.id, userId: req.userId},
        });
        if (!note) {
            return res.status(404).json({ message: '笔记不存在'});
        }

        const {title,content, folderId} = req.body;
        await note.update({
            title,
            content,
            folderId
        });

        res.json(note);
    } catch (err) {
        console.error(err);
        res.status(500).json({message:'服务器错误'});
    }
};

exports.remove = async(req, res) => {
    try {
        const count = await Note.destroy ({
            where: {id:req.params.id, userId:req.userId},
        });
        if (count === 0) {
            return res.status(404).json({message:'笔记不存在'});
        }
        res.json({message:'删除成功'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message:'服务器错误'});
    }
};