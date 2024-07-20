import React, { useState } from "react"
import { Link } from "react-router-dom"

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(form)
  }

  return (
    <main className="h-screen w-full pt-20 md:py-5 bg-gray-100">
      <form
        className="w-[22rem] mx-auto p-4 bg-white rounded-md shadow flex flex-col justify-center"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col-reverse gap-3 justify-center items-center mt-6">
          <h1 className="text-2xl font-semibold">Welcome! User</h1>
        </div>

        <div className="flex flex-col my-6 gap-3">
          <input type="text"
            placeholder="First name"
            className="border-b-2 border-gray-300 py-2 px-1 outline-none"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Last name"
            className="border-b-2 border-gray-300 py-2 px-1 outline-none"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="Email"
            className="border-b-2 border-gray-300 py-2 px-1 outline-none"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="number"
            placeholder="Phone number"
            className="border-b-2 border-gray-300 py-2 px-1 outline-none"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Password"
            className="border-b-2 border-gray-300 py-2 px-1 outline-none"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <button
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out mt-5"
            type="submit"
          >
            Register
          </button>
        </div>

        <div>
          <div className="flex gap-2 justify-center">
            <p
              className="text-sm text-gray-600 font-light mt-2 text-center"
            >
              Already have an account?
            </p>

            <Link
              to={"#"}
              className="text-blue-500 text-sm font-light mt-2 text-center hover:underline transition duration-300 ease-in-out"
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </main>
  )
}

export default Register