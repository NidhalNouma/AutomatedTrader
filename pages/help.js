import Sidenav from "../Features/SideNav";
import Header from "../Features/Header";

export default function help() {
  return (
    <>
      <Sidenav cpath="help" />
      <div className="w-full flex flex-col">
        <Header />
        <div className="px-10 py-8"></div>
      </div>
    </>
  );
}
