let express=require('express')
let app=express();
let cors=require('cors')
const PORT=process.env.PORT || 5000;
const { dbConnect } = require('./mongoose/connect');
require('dotenv').config();


const { router:TrackRouter } = require('./controllers/TrackController');
const {router:AuthRouter}=require('./controllers/AuthController');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}));


try{
    dbConnect();
}catch(e){
    console.log(e);
    setTimeout(()=>{
        dbConnect();
    },5000*600)
}
app.use(TrackRouter);
app.use(AuthRouter);

app.get('/',(req,res)=>{
    res.json({
        isError:false,message:'Welcome to the player'
    })
})


app.listen(PORT,(err)=>{
    console.log(`server running on ${PORT}`)
})