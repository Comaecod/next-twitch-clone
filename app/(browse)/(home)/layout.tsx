import Navbar from './_components/navbar';

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default BrowseLayout;
