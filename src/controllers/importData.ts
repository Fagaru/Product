import CIS_CIP_bdpm from "../models/CIS_CIP_bdpm.model";
import db from "../database/db";
import fs from "fs";
import { logger } from "../logging/logger";

const dataFilePath = 'data_gouv/files/CIS_CIP_bdpm.txt'; // Adjust the path to your data file

db.once('open', async () => {
  logger.info('Connected to MongoDB');
  try {
    const data = await fs.promises.readFile(dataFilePath, 'utf8');
    const lines = data.trim().split('\n');
    for (const line of lines) {
      const [codeCIS, codeCIP7, presentationLabel, administrativeStatusOfPresentation, marketingStatus, marketingDeclarationDate, codeCIP13, approvalForCommunities, reimbursementRate, priceInEuros, indicGivingEntitlementToRefund] = line.replace(/,[^\\t]*\\t/g, '\t').split('\t');
      const cis_cip_bdpm2 = new CIS_CIP_bdpm({ codeCIS, codeCIP7, presentationLabel, administrativeStatusOfPresentation, marketingStatus, marketingDeclarationDate, codeCIP13, approvalForCommunities, reimbursementRate, priceInEuros, indicGivingEntitlementToRefund });
      await cis_cip_bdpm2.save();
      logger.info(`Inserted: ${codeCIS}, ${marketingDeclarationDate}`);
    }
    logger.info('Data insertion complete');
  } catch (error) {
    logger.error('Error:', error);
  } finally {
    db.close();
  }
});
