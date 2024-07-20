import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({
      ...form, // Spread operator to copy the previous state
      [name]: value, // Updating the value of the input field
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Preventing the default behaviour of the form

    try {
      let response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      if (!response.ok){
        const errorData = await response.json()

        if (errorData.message === 'User not found') {
          alert('User not found')
        } else if (errorData.message === 'Invalid password') {
          alert('Invalid password')
        } else {
          alert('Internal server error')
        }
      } else {
        alert('Logged in successfully')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <main className="h-screen w-full pt-20 md:py-5 bg-gray-100">
      <form
        className="w-[22rem] mx-auto p-4 bg-white rounded-md shadow flex flex-col justify-center"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col-reverse gap-3 justify-center items-center mt-6">
          <h1 className="text-2xl font-semibold">Welcome! Admin</h1>
        </div>

        <div className="flex flex-col my-6 gap-3">
          <input
            type="email"
            placeholder="Email"
            className="border-b-2 border-gray-300 py-2 px-1 outline-none"
            name="email"
            value={form.email}
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
            Login
          </button>
        </div>

        <div>
          <div className="flex gap-2 justify-center">
            <p
              className="text-sm text-gray-600 font-light mt-2 text-center"
            >
              Don't have an account?
            </p>

            <Link
              to={"/register"}
              className="text-blue-500 text-sm font-light mt-2 text-center hover:underline transition duration-300 ease-in-out"
            >
              Register
            </Link>
          </div>
        </div>
      </form>
    </main>
  )
}

export default Login