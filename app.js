import { get } from './profile.js';

const users = process.argv.slice(2);
users.forEach(get);
