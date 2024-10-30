

const Navbar = () => {
  return (
    <nav className=" bg-transparent flex items-center px-4 h-14 mycontainer">
    <div className="logo font-bold text-2xl">
    <span className=" text-green-500">&lt;</span>
    Pass
    <span className=" text-green-500">OP/&gt;</span>
    </div>
    <ul>
        <li className="flex gap-4 mx-7">
            <a className=" hover:font-bold" href="">home</a>
            <a className=" hover:font-bold" href="">about</a>
            <a className=" hover:font-bold" href="">contact</a>
        </li>
    </ul>
    </nav>
  )
}

export default Navbar