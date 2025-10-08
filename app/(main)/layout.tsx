import Header from "@/components/Header";
export default function homeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
        <>
        <Header/>
        {children}
        </>
     
  );
}