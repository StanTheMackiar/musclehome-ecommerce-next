import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';

type Data = {
  message: string
}

//? Desactiva el parser del body que viene por default
export const config = {
    api: {
      bodyParser: false,
    }
}

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {

  switch (req.method) {
    case 'POST':
      return uploadImages(req, res)

    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

const saveFile = ( file: formidable.File ) => {

  const data = fs.readFileSync( file.filepath );
  fs.writeFileSync(`./public/${ file.originalFilename }`, data);
  fs.unlinkSync(file.filepath);
  return;

}

const parseFiles = async(req: NextApiRequest) => {
  
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse( req, async(err, fields, files) => {
      console.log({ err, fields, files });

      if(err) {
        return reject(err);
      }

      saveFile( files.file as formidable.File )
      resolve(true);

    })
  })

}

const uploadImages = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

  await parseFiles(req)

  return res.status(200).json({ message: 'Imagen subida' })
}

export default handler