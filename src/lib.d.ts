declare module '*.svg' {
  const content: any;
  export default content;
  namespace JSX {
    interface IntrinsicElements {
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      // Tambahkan deklarasi jenis elemen lainnya di sini jika diperlukan
    }
  }
}