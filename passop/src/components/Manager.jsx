import { useRef } from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { v4 as uuidv4 } from 'uuid';


import 'react-toastify/dist/ReactToastify.css';


const Manager = () => {
  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: [e.target.value] });
  };

  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");

    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const ref = useRef();
  const passwordref = useRef();

  const showpassword = () => {
    passwordref.current.type = "text";
    if (ref.current.src.endsWith("hide.png")) {
      ref.current.src = "icons/view.png";
      passwordref.current.type = "password";
    } else {
      ref.current.src = "icons/hide.png";
      passwordref.current.type = "text";
    }
  };

  const savepassword = () => {
    
    

      setpasswordArray([...passwordArray, {...form,id:uuidv4()}]);
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
      setForm({ site: "", username: "", password: "" })
      
      toast("Password saved")
    

  };
  const handleEdit=(id)=>{
    
    setForm(passwordArray.find(i=>i.id===id))
    setpasswordArray(passwordArray.filter(i => i.id!==id))
      
  }
    const handleDelete=(id)=>{
      
      if(id){
          let check= confirm("Do you want to delete it");
          if(check){

            setpasswordArray(passwordArray.filter(item=>item.id!==id))
            
            localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
            toast("Password Deleted")
            
          }
      }
      
    }

    // toster

  const copytext=(text)=>{
    
      navigator.clipboard.writeText(text)
      toast("Text copied!")
  }

  return (
    <>
        
      {/* <div className="absolute inset-0 -z-10 h-full w-full
       bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]
        bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]">

        </div>
      </div> */}

      <div className="sm:p-0 md:p-0 p-2  mycontainer">
        <div className="logo font-bold text-4xl text-center">
          <span className=" text-green-500">&lt;</span>
          Pass
          <span className=" text-green-500">OP/&gt;</span>
        </div>
        <p className=" text-green-500 py-6 text-center">
          Your password manager
        </p>
        <div className=" flex flex-col p-4 gap-4 items-center">
          <input
            placeholder="Enter your website URL"
            className=" rounded-full border border-green-900 bg-transparent w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
            value={form.site}
            onChange={handlechange}
          />

          <div className="flex md:flex-row flex-col  w-full justify-between gap-3">
            <input
              placeholder="Enter User Name"
              className=" rounded-full border border-green-900 bg-transparent w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={handlechange}
            />
            <div className=" relative">
              <input
                ref={passwordref}
                placeholder="Enter password"
                className=" rounded-full border border-green-900 bg-transparent w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handlechange}
              />

              <span
                className=" absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showpassword}
              >
                <img
                  ref={ref}
                  className=" p-1"
                  width={26}
                  src="icons/view.png"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savepassword}
            className="flex justify-center items-center border-2 border-green-600 bg-gray-300 px-4 py-2 hover:bg-green-300 w-fit rounded-full"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
            ></lord-icon>
            Add Your Password
          </button>
        </div>
        <div className="passwords">
          <h2>Your passwords</h2>
          {passwordArray.length === 0 && <div> No password to show </div>}
          {passwordArray.length != 0 && (
            <div className=" overflow-x-auto">
            <table className="table-auto w-full rounded-md overflow-hidden ">
              <thead className="bg-green-500">
                <tr>
                  <th>Site</th>
                  <th>User Name</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className=" bg-slate-300">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" border border-black text-center px-4">
                        <div className="flex">
                          {item.site}
                          <div className=" cursor-pointer text-center pt-1 mx-5 size-5" onClick={()=>{copytext(item.site)}}>
                            <img src="icons/copy.png" />
                          </div>
                        </div>
                      </td>

                      <td className=" border border-black text-center px-4">
                        <div className="flex">
                          {item.username}
                          <div className=" cursor-pointer text-center pt-1 mx-5 size-5 " onClick={()=>{copytext(item.site)}}>
                            <img src="icons/copy.png" />
                          </div>
                        </div>
                      </td>
                      

                      <td className=" border border-black text-center px-4">
                        <div className="flex">
                          {item.password}
                          <div className=" cursor-pointer text-center pt-1 mx-5 size-5" onClick={()=>{copytext(item.site)}}>
                            <img src="icons/copy.png" />
                          </div>
                          
                        </div>
                      </td>
                      <td className=" border border-black text-center px-4">
                      <div className="flex cursor-pointer justify-center">

                      <span className=" text-center pt-1 mx-5 size-5" onClick={()=>handleEdit(item.id)}><img src="icons/edit.png"/></span>
                      <span className=" text-center pt-1 mx-5 size-5" onClick={()=>handleDelete(item.id)}><img src="icons/delete.png"/></span>
                      </div>
                      </td>


                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
