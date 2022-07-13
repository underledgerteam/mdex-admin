// Assets
import MdexLogo from "../assets/images/logo/mdex_logo.png";
import ButtonConnect from "../components/ButtonConnect";



const Navbar = () => {
  
  return (<div className="flex flex-col">
  <div className="navbar bg-custom-navbar w-full lg:mx-auto justify-between items-center font-bold lg:px-8 py-3">
    <div className="navbar-start">
      
      <div className="w-14">
        <div className="text-xl flex text-2xl text-white uppercase font-bold cursor-pointer"><img src={MdexLogo} alt="MDex Admin" /><span className="mt-3 ml-3 italic">Admin</span></div>
      </div>
    </div>
    <div className="lg:flex navbar-end">
      <ButtonConnect />
    </div>
  </div>
</div>
  );
};

export default Navbar;
