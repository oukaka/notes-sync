const { Folder } = require('../models');

exports.list = async (req, res) => {
    try {
        const folders = await Folder.findAll({
            where: {userId: req.userId},
            order: [['updatedAt', 'DESC']],
        });
        res.json(folders);
        } catch (err) {
            console.error(err);
            res.status(500).json({message:'服务器错误'});
        }
    };

    exports.detail = async (req, res) =>{
        try {
            const folder = await Folder.findOne({
                where: {id: req.params.id, userId: req.userId},
            });
            if (!folder) {
                return res.status(404).json({message:'文件夹不存在'});
            }
            res.json(folder);
        } catch (err) {
            console.error(err);
            res.status(500).json({message:'服务器错误'});
        }
        };

exports.create = async (req, res) => {
    try {
        const {name} = req.body;
        const folder = await Folder.create({
            name,
            userId: req.userId,
        });
        res.status(201).json(folder);
    } catch (err) {
        console.error(err);
        res.status(500).json({message:'服务器错误'});
    }
    };

exports.update = async (req, res) => {
    try {
        const folder = await Folder.findOne({
            where: {id:req.params.id, userId: req.userId},
        });
        if (!folder) {
            return res.status(404).json({message:'文件夹不存在'});
        }

        const { name } = req.body;
        await folder.update({name});
        res.json(folder);
    } catch (err) {
        console.error(err);
        res.status(500).json({message:'服务器错误'});
    }
};

exports.remove = async (req, res) => {
    try {
        const folder = await Folder.destroy ({
            where: {id:req.params.id, userId: req.userId},
        });
        if (!folder) {
            return res.status(404).json({message:'文件夹不存在'});
        }
        res.json({message:'删除成功'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message:'服务器错误'});
    }
};