import { error } from "console";
import { Redis } from "ioredis";
require("dotenv").config();

const redisClient= () => {
    if(process.env.REDIS_URL){
        console.log("Redis Connected");
        return process.env.REDIS_URL;
    }
    throw new error('Redis Connection Falied');
}

export const redis = new Redis(redisClient());