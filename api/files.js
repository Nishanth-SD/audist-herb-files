import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filesDir = path.join(process.cwd(), 'files');

  const getFilesRecursively = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    return entries.map(entry => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return { name: entry.name, type: 'directory', children: getFilesRecursively(fullPath) };
      } else {
        return { name: entry.name, type: 'file', path: fullPath.replace(process.cwd(), '') };
      }
    });
  };

  try {
    const fileList = getFilesRecursively(filesDir);
    res.status(200).json(fileList);
  } catch (error) {
    res.status(500).json({ error: 'Unable to read files directory.' });
  }
}
