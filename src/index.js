import dotenv from 'dotenv';

dotenv.config({ path: './public/.env' });

import mongoose  from 'mongoose';

import { DB_name } from './constants.js';
import connectDB from './db/index.js';



connectDB();