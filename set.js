const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYURvZ1U0T1lhVGlRMkN2T3Y1NHZWODZETFhWSWlqVFhMSUNuck9nczJYdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUlE1UjEwd2pFdUxQYUJWeXZ3RFZRMkZHMFIxaDk0S0lFRFhzNVRhZXdqUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRSnBMZk5UTXZhblVYZk40cGw5bHdwZm5GdThkUGNYNWxiWkZtbHZpWG1jPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4ZjRmZXc0Mm5hTEJYamFrTzgvR3FraXE4VWY2RndFYlZXQXh6MWhpVzJVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFEUEU3RUM2SmUrYzBsUTJlL3lCNFMwSG1QVlprYXRBTmVjVVJpdGFhR0k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVnVlRJUlpuQWk4Mk1MbmFTbDY5V0dCL0s5Wi92MnZYcjdpOVVYV0NrSEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic083TXRtN3FqVW83V0VqN3hlTTh2dktQRjVROEJJV2t2QjYwWkhrSUxXYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSHpwQVV0eGRvZ3NDRTZZUzFIT0VnUXZDK1V6aTJvaERXTmpGYWIrMDFTRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im4xcVVWcVc1U3RFRUR5WXh1NTBRcGZ6alg0aVh1QUs1RDlTdjVUdk8yczN3Y0VwNUlHWlh4SEliVHF4TWVnTzJwNEp3VzBjZndEQTV0ejBLMktVdGhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjksImFkdlNlY3JldEtleSI6ImlLR1V1a1BPVFdRRkJEVHdyN1E5L01lY2pTc3JOTFFjUEg1T1ZpaTBSYlU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1NzQ2NzY5OTYwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBMUE1NDYzOTQ2RUZGMzZFNjlCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Mjk4Mzc1OTV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ik0zTmpaZjRjU2xDSHdwRHZSdWg3SWciLCJwaG9uZUlkIjoiNmFhMDQyZjYtYjE3OC00Y2E4LTkzMjQtODU5OTRhMDI3MWVhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhzVUJjVDJZelRENGdTeGZMWTZnWGVMaGZkUT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvOEEyekpFUXdyNHRnd01uRGFGZUVBc2RSMHM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiODdNQ1dWRVciLCJtZSI6eyJpZCI6IjI1NTc0Njc2OTk2MDo1QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPR1FtTDBCRUl6MDdMZ0dHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJZLzdiZHpjUXZlUjl0K3Q0QmVkZ1JtSUllc3V5RW5jZ2RrZnBoUlo3K0ZNPSIsImFjY291bnRTaWduYXR1cmUiOiI5UXFjR0M4UHFQZzljaGJ5RFpvTTk0TUl3eEl5d25kQ2xEcDV6Q2lyM05FazMyTElldWpxNDREWUZaN202cFN3aitvSFlFWUNWT1c3YlRKekt4TnloZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRDAra1lPMmVjZkZXZ0NXZWlrYmx1anA0ME51MzFoZDZqQStxekx1SHhTc1g0RVZlMUtDaWN1MFQ5MEZTWC9zS1RWQW12UVpjWTcweEdQY1hGcFdaaEE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU3NDY3Njk5NjA6NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXUCsyM2MzRUwza2ZiZnJlQVhuWUVaaUNIckxzaEozSUhaSDZZVVdlL2hUIn19XSwicGxhdGZvcm0iOiJpcGhvbmUiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjk4Mzc1OTMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTVFzIn0=',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Moe Vippeer",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "255746769960",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
