import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary'


cloudinary.config( process.env.CLOUDINARY_URL || '' );


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

const saveFile = async( file: formidable.File ) => {
  // const data = fs.readFileSync( file.filepath );
  // fs.writeFileSync(`./public/${ file.originalFilename }`, data);
  // fs.unlinkSync(file.filepath);
  // return;

  const { secure_url } = await cloudinary.uploader.upload(file.filepath)
  return secure_url;
}

const parseFiles = async(req: NextApiRequest): Promise<string> => {
  
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse( req, async(err, fields, files) => {
      // console.log({ err, fields, files });

      if(err) {
        return reject(err);
      }
      const filePath = await saveFile( files.file as formidable.File );
      resolve(filePath);
    })
  })

}

const uploadImages = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

  const imageUrl = await parseFiles(req)

  return res.status(200).json({ message: imageUrl })
}

export default handler