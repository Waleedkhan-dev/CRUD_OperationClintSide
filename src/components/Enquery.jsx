import { Fragment, useEffect, useState } from "react"
import React from "react"
import Swal from 'sweetalert2';

import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
const Enquery = () => {
  const [formDat, setFormDat] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: ""

  })
  const [enqueryList, setEnqueryList] = useState([])
  const handleSubmitEnquery = (e) => {

    e.preventDefault()


    if (formDat._id) {
      axios.put(`http://localhost:8000/api/enquery/enquery-update/${formDat._id}`, formDat)
        .then((res) => {
          toast.success("Enquery Updated Successfully")
        })

    }
    else {
      axios.post('http://localhost:8000/api/enquery/enquery-insert', formDat)
        .then((res) => {
          console.log("check Data", res.data),
            setFormDat({
              name: "",
              email: "",
              phone: "",
              message: "",

            })

        })
    }
  }
  const getValue = (e) => {
    const nameSection = e.target.name
    const valueSection = e.target.value
    const oldData = { ...formDat }
    console.log(nameSection);
    oldData[nameSection] = valueSection
    setFormDat(oldData)

  }
  const getAlldata = async () => {
    const res = await axios.get("http://localhost:8000/api/enquery/enquery-list", enqueryList)
    return res.data.EnqueryList
  }
  useEffect(() => {
    const fetchdata = async () => {
      const Data = await getAlldata()
      setEnqueryList(Data)
    }
    fetchdata()
  }, [enqueryList])
  const enqueryDel = (itemDel) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8000/api/enquery/enquery-delete/${itemDel}`)
          .then(() => {

          })
        Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
      }
    });
  }

  const getSinleUp = async (singleId) => {
    await axios.get(`http://localhost:8000/api/enquery/single/${singleId}`)
      .then((res) => {
        const Data = res.data
        setFormDat(Data.res);

      })

  }


  return (
    <Fragment>
      <ToastContainer />
      <div className="grid grid-cols-[30%_auto]">
        <div className="bg-gray-200 p-4">
          <form action="" onSubmit={handleSubmitEnquery}>
            <h1 className="font-semibold">Enquer form</h1>
            <div className="py-3 flex flex-col text-start">
              <label htmlFor="">Name</label>
              <input type="text" required name="name" value={formDat.name} onChange={getValue} id="" placeholder="Enter your Name" className="outline-none border-none rounded" />
            </div>
            <div className="py-3 flex flex-col text-start">
              <label htmlFor="">Email</label>
              <input type="text" required value={formDat.email} onChange={getValue} name="email" id="" placeholder="Enter your email" className="outline-none border-none rounded" />
            </div>
            <div className="py-3 flex flex-col text-start">
              <label htmlFor="">Phone</label>
              <input type="text" required value={formDat.phone} onChange={getValue} name="phone" id="" placeholder="Enter your Phone No " className="outline-none border-none rounded" />
            </div>
            <div className="py-3 flex flex-col text-start">
              <label htmlFor="">Message</label>
              <textarea onChange={getValue} required value={formDat.message} name="message" id="">
                Enter your Message
              </textarea>
            </div>
            <div className="py-3">
              <button className="bg-blue-700 rounded text-white w-full p-1.5">{formDat._id ? "Update" : "Save"}</button>
            </div>
          </form>
        </div>
        <div className="bg-gray-200">
          <h1 className="text-center font-semibold p-4">Enquery LIst</h1>
          <table className="border-collapse p-2 rounded bg-gray-50  w-full mt-2">
            <thead className="bg-gray-100">
              <tr >
                <th className="border">Sr No</th>
                <th className="border">Name</th>
                <th className="border">Email</th>
                <th className="border">Phone</th>
                <th className="border">message</th>
                <th className="border">Delete</th>
                <th className="border">Edit</th>
              </tr>
              <tr />
            </thead>

            <tbody>
              {
                enqueryList.length >= 1 ? (
                  enqueryList.map((item, index) => (

                    <tr className="text-start" key={index}>
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{item.name}</td>
                      <td className="border p-2">{item.email}</td>
                      <td className="border p-2">{item.phone}</td>
                      <td className="border p-2">{item.message}</td>
                      <td className="border p-2"><button onClick={() => enqueryDel(item._id)} className="bg-red-600 px-2 py-1 rounded  text-white hover:bg-red-500 cursor-pointer">Delete</button></td>
                      <td className="border p-2"><button onClick={() => getSinleUp(item._id)} className="bg-green-600 hover:bg-green-500 cursor-pointer text-white px-2 py-1 rounded">edit</button></td>


                    </tr>


                  ))

                ) : (
                  <div>
                    <h1>No Data Found</h1>
                  </div>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  )
}
export default Enquery