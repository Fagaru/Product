import { Request, Response, NextFunction } from "express";
import fs from "fs";
import axios from "axios";
import path from "path";
import db from "../database/db";
import CIS_CIP_bdpm from "../models/CIS_CIP_bdpm.model";

export const downloadFiles = async (req: Request, res: Response, next: NextFunction) => {
    const fileUrl = 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_bdpm.txt';
    const destinationFilePath = '../data_gouv/file_txt';

    const directoryPath = '../data_gouv/file_txt/'; // Replace this with the path to your desired directory
    // const fileName = 'CIS_bdpm.txt';
    const fileContent = '';
    const myDictionary = {
        key1: 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_bdpm.txt',
        key2: 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_CIP_bdpm.txt',
        key3: 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_COMPO_bdpm.txt',
        key4: 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_HAS_SMR_bdpm.txt',
        key5: 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_HAS_ASMR_bdpm.txt',
        key6: 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=HAS_LiensPageCT_bdpm.txt',
        key7: 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_GENER_bdpm.txt',
        key8: 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_CPD_bdpm.txt',
        key9: 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_InfoImportantes.txt'
    };

    // Create the directory if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
    try {
        Object.values(myDictionary).forEach((value) => {
            console.log(value);
            let match = value.split('=');
            const fileName = match[1];
            console.log(fileName);

            const filePath = path.join(directoryPath, fileName);

            fs.writeFile(filePath, fileContent, (err) => {
                if (err) {
                    console.error('Error creating the file:', err);
                } else {
                    console.log('File created successfully!');
                }
            });
            
            downloadFile(fileUrl, filePath)
            console.log('File downloaded successfully.');
        });
        res.json({
            status: "success",
            data: { },
            message: 'File downloaded successfully.',
        })
    } catch(error) {
        console.error('Error downloading file:', error);
        next(error);
    }
};


// Import data from file.txt

const dataFilePath = '../data_gouv/file_txt/CIS_CIP_bdpm.txt'; // Adjust the path to your data file

export const importData = async (req: Request, res: Response, next: NextFunction) =>{
  db.once('open', async () => {
    console.log('Connected to MongoDB');

    try {
      const data = await fs.promises.readFile(dataFilePath, 'utf8');
      const lines = data.trim().split('\n');

      for (const line of lines) {
        const [codeCIS, codeCIP7, presentationLabel, administrativeStatusOfPresentation, marketingStatus, marketingDeclarationDate, codeCIP13, approvalForCommunities, reimbursementRate, priceInEuros, indicGivingEntitlementToRefund] = line.split('\t');
        const cis_cip_bdpm = new CIS_CIP_bdpm({ codeCIS, codeCIP7, presentationLabel, administrativeStatusOfPresentation, marketingStatus, marketingDeclarationDate, codeCIP13, approvalForCommunities, reimbursementRate, priceInEuros, indicGivingEntitlementToRefund });
        await cis_cip_bdpm.save();
        console.log(`Inserted: ${codeCIS}, ${marketingDeclarationDate}`);
      }

      console.log('Data insertion complete');
      res.json({
        status: "success",
        data: { },
        message: 'File downloaded successfully.',
      })
    } catch (error) {
      console.error('Error:', error);
      next(error);
    } finally {
      db.close();
    }
  });
}







const downloadFile = async (url: string, destinationPath: fs.PathLike) => {
    try {
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
      });
  
      const writer = fs.createWriteStream(destinationPath);
      response.data.pipe(writer);
  
      return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    } catch (error) {
      throw new Error('Error downloading the file: ' + error);
    }
  };
