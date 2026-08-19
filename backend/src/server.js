require('dotenv').config();
const app = require('./app');
// const sequelize = require('./config/db');
const { sequelize } = require('./models');
// require('./models/User'); 


const PORT = process.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log('数据库连接成功');
        return sequelize.sync();
    })
   .then(() => {
    app.listen(PORT, () => console.log(`服务已启动: http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('数据库连接失败:', err);
});