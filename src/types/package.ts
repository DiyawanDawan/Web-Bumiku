import React from "react";

export type Package = {
  no: number;
  sensorType: string;
  update: string;
  fileType: string; // fileType sebaiknya bertipe string karena Anda menyimpan nilai 'pdf' sebagai string
  status: string;
  pdfUrl: string; // Ubah pdfUrl menjadi bertipe string
};
