import ResizablePanel from "../ui/ResizablePanel";

const HomePage = () => {
  const left = <div></div>;
  const right = <div></div>;

  return (
    <div className="h-80">
      <h1 className="title">Banco de Datos</h1>
      <ResizablePanel left={left} right={right} />
    </div>
  );
};

export default HomePage;
