import fs from "fs/promises";

export default async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return data.toString();
  } catch (e) {
    console.error(`File cant be read: ${e.message}`);
  }
  return;
}
