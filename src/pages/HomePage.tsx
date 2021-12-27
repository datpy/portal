import ResizablePanel from "../ui/ResizablePanel";

const HomePage = () => {
  const left = <div></div>;
  const right = <div></div>;

  return (
    <div className="min-h-full flex flex-col w-full">
      <h1 className="title flex-grow-0 flex-shrink">Banco de Datos</h1>
      <ResizablePanel className="flex-grow flex-shrink" left={left} right={right} />
    </div>
  );
};

export default HomePage;
