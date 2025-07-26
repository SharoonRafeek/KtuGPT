import { config } from "dotenv";
config({ path: ".env.local" });

import { getChunkedDocsFromPDF } from "@/lib/pdf-loader";
import { embedAndStoreDocs } from "@/lib/chroma-vector-store";

// This operation will prepare and store documents in Chroma
(async () => {
  try {
    console.log("Preparing chunks from PDF file");
    const docs = await getChunkedDocsFromPDF();
    console.log(`Loading ${docs.length} chunks into Chroma...`);
    await embedAndStoreDocs(docs);
    console.log("Data embedded and stored in Chroma database");
  } catch (error) {
    console.error("Init client script failed ", error);
  }
})();
