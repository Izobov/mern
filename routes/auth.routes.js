const {Router}=require ('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs') // библиотека позволяет хешировать пароли (сложно взломать)
const {check, validationResult} = require ('express-validator')
const jwt = require ('jsonwebtoken')
const config = require('config')


const  router = Router()


module.exports =router
// /api/auth/register
router.post(
    '/register',
    [
        check('email', "Incorrect email").isEmail(),
        check('password', "Incorrect password").isLength({min:6})
    ],
    async (req, res)=>{   // post запрос на путь /api/auth/register
        try {
            const errors=validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Validation errors"
                })
            }

            const {email, password} = req.body;

            const candidate= await User.findOne({email})

            if(candidate){
                return res.status(400).json({message: "This user already exists"})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user =new User({email, password: hashedPassword})

            await user.save()
            res.status(201).json({message: "User has been created"})

        } catch(e){
            res.status(500).json({message:" Something is wrong, try again"})
        }
    }
)  

router.post(
    '/login',
    [
        check('email', 'Wrong email').normalizeEmail().isEmail(),
        check("password", "Please entry your password" ).exists()
    ],
    async (req, res)=>{   
        try {
            const errors=validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Validation errors while trying entry"
                })
            }

            const {email, password}= req.body

            const user = await User.findOne({email})

            if(!user){
                return res.status(400).json({
                    message: "User is not found"
                })
            }
            
            const isMatch = await bcrypt.compare(password, user.password)
            
            if(!isMatch){
                return res.status(400).json({
                    message: "Uncorrect password, try again"
                })
            }

          const token = jwt.sign(
            {userId: user.id},
            config.get("jwtSecret"),
            {expiresIn: '1h'}
          )
        
            res.json({token, userId: user.id})

        } catch(e){
            res.status(500).json({message:" Something is wrong, try again"})
        }
    }
)
