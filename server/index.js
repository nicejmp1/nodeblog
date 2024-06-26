const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const User = require('./models/User');

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const secret = 'nicejmp';

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
mongoose.connect("mongodb+srv://nicejmp:qkrwjdals12@cluster0.isdcpo7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
// 회원가입
app.post('/register', async (req, res) => {
    const { youName, youEmail, youPass } = req.body;

    try {
        const userInfo = await User.create({
            youName,
            youEmail,
            youPass: bcrypt.hashSync(youPass, salt)
        })
        res.status(200).json(userInfo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 로그인
app.post('/login', async (req, res) => {
    const { youEmail, youPass } = req.body;

    try {
        // 이메일 검사
        const userInfo = await User.findOne({ youEmail });
        if (!userInfo) {
            return res.status(400).json({ message: '이메일 또는 비밀번호가 정확하지 않습니다.' });
        }

        // 비밀번호 검사
        const isPassValid = bcrypt.compareSync(youPass, userInfo.youPass);
        if (!isPassValid) {
            return res.status(400).json({ message: '이메일 또는 비밀번호가 정확하지 않습니다.' });
        }

        // 로그인(토근 발행)
        jwt.sign(
            { youName: userInfo.youName, youEmail, id: userInfo._id },
            secret,
            { expiresIn: '1d' },
            (err, token) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                // 발행한 토큰을 쿠키에 저장
                res.cookie('token', token, { httpOnly: true, secure: true }).json({
                    id: userInfo._id,
                    youName: userInfo.youName,
                    youEmail,
                    token
                });
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// 로그인 확인 
app.get('/profile', (req, res) => {
    const { token } = req.cookies;

    // 토근 값 유효성 확인
    jwt.verify(token, secret, (err, info) => {
        if (err) {
            return res.json({ message: '토근 검증 실패, 관리자에게 문의하세요!' });
        }
        res.json(info);
    })
});

// 로그아웃
app.post('/logout', (req, res) => {
    res.cookie('token', { path: "/" }).json({ message: '로그아웃 성공' });
})


app.listen(9000, () => {
    console.log('Server is running on port 9000');
})