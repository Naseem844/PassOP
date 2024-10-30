import { useRef } from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// import { v4 as uuidv4 } from 'uuid';


import 'react-toastify/dist/ReactToastify.css';


const Manager = () => {
  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: [e.target.value] });
  };

  const [form, setForm] = useState({ site: "", username: "", password: "" });

  const [passwordArray, setpasswordArray] = useState([]);

  const [editID, setEditID] = useState(false)

  const getPassword= async()=>{
    let req =await fetch("http://localhost:3000/")
    let passwrods = await req.json()
    setpasswordArray(passwrods)

  }

  useEffect(() => {
    getPassword()
  }, []);

  const ref = useRef();
  const passwordref = useRef();
//show
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
//..........save passwords.........
  const savepassword = async() => {
         
    if (form.site[0].length <= 3 || form.username[0].length <= 3 || form.password[0].length <= 3) {
      alert('All fields must be greater than 3 characters.');
      return; // Exit the function if validation fails
  }


    const newEntry = {...form}
    const method = editID ? 'PUT' : 'POST';
    const url = editID 
        ? `http://localhost:3000/passwords/${editID}` 
        : 'http://localhost:3000/passwords';

    await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
    });
    setEditID(null);
    setForm({ site: "", username: "", password: "" })
    getPassword()

      
    

  };
  //.........end save passwords.......
  const handleEdit=(item)=>{
    setForm(item)
    setEditID(item._id)
      
  }

  //delete
    const handleDelete= async(_id)=>{
      //console.log(_id)
      if(_id){
          let check= confirm("Do you want to delete it");
          if(check){

            setpasswordArray(passwordArray.filter(item=>item._id!==_id))
            
            // localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
            let res = await fetch(`http://localhost:3000/delete/${_id}`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" }
          });

              console.log(res)
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
                        <div className="flex justify-between">
                          {item.site}
                          <div className=" cursor-pointer text-center pt-1 mx-5 size-5" onClick={()=>{copytext(item.site)}}>
                            <img src="icons/copy.png" />
                          </div>
                        </div>
                      </td>

                      <td className=" border border-black text-center px-4">
                        <div className="flex  justify-between">
                          {item.username}
                          <div className=" cursor-pointer text-center pt-1 mx-5 size-5 " onClick={()=>{copytext(item.username)}}>
                            <img src="icons/copy.png" />
                          </div>
                        </div>
                      </td>
                      

                      <td className=" border border-black text-center px-4">
                        <div className="flex  justify-between">
                          <span> {"*".repeat(item.password[0].length)}</span>
                          <div className=" cursor-pointer pt-1 mx-5 size-5" onClick={()=>{copytext(item.password)}}>
                            <img src="icons/copy.png" />
                          </div>
                          
                        </div>
                      </td>
                      <td className=" border border-black text-center px-4">
                      <div className="flex cursor-pointer justify-center">

                      <span className=" text-center pt-1 mx-5 size-5" onClick={()=>handleEdit(item)}><img src="icons/edit.png"/></span>
                      <span className=" text-center pt-1 mx-5 size-5" onClick={()=>handleDelete(item._id)}><img src="icons/delete.png"/></span>
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
