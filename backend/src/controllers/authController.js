const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models');

exports.register = async (req, res) => {
    try {
        const {email,password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message:'邮箱密码不能为空'});
        }

    const exists = await User.findOne({where: {email}});
    if (exists) {
        return res.status(409).json({message:'该邮箱已被注册'});
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({email,password: hash});

    res.status(201).json({id:user.id,email:user.email});
} catch (error) {
    console.error(error);
    res.status(500).json({message:'服务器错误'});
}
};

exports.login = async (req, res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(401).json({message:'邮箱或密码错误'});
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({message:'邮箱或密码错误'});
        }

        const token =jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        );

        res.json(
            {
                token,user:{id:user.id, email:user.email}
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'服务器错误'});
    }
};


