import fs from 'fs';
import path from 'path';

const generate = () => {
   const IDs = JSON.parse(fs.readFileSync(path.join(__dirname, 'ID.json'), 'utf-8'));

   const arrIds = Object.keys(IDs);
   const lastIndex = parseInt(arrIds[arrIds.length - 1]);
   const nextInex = lastIndex + 1;
   IDs[nextInex.toString()] = true;

   fs.writeFileSync(path.join(__dirname, 'ID.json'), JSON.stringify(IDs));
   return nextInex;
};

export = generate;
