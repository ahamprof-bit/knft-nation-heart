export type PublicDocument = {
  id: string;
  title: string;
  description: string;
  pdfUrl: string; // empty until a public link is configured
  isPublic: boolean;
};

export const documents: PublicDocument[] = [
  { id: "pan", title: "PAN", description: "Content Coming Soon", pdfUrl: "", isPublic: false },
  { id: "form-10ac", title: "Form 10AC", description: "Content Coming Soon", pdfUrl: "", isPublic: false },
  { id: "official", title: "Official Documents", description: "Content Coming Soon", pdfUrl: "", isPublic: false },
  { id: "signed", title: "Signed KNFT Documents", description: "Content Coming Soon", pdfUrl: "", isPublic: false },
  { id: "csr", title: "CSR Documents", description: "Content Coming Soon", pdfUrl: "", isPublic: false },
];
