import baseDoc from "./docs.json";
import accountDocs from "./modules/account/account.docs.json";
import { clone } from "lodash";

const docs = clone(baseDoc);
const availableDocs = [
  accountDocs,
];

export default function generateDoc() {
  for (const ad of availableDocs) {
    docs.tags = [...docs.tags, ...ad.tags];
    docs.paths = { ...docs.paths, ...ad.paths };
    docs.components.schemas = { ...docs.components.schemas, ...ad.components.schemas };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    if (ad.components.securitySchemes) { // @ts-ignore
      docs.components.securitySchemes = { ...docs.components.securitySchemes, ...ad.components?.securitySchemes };
    }
  }
  return docs;
}
