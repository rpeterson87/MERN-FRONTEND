import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


const Show = ({ URL }) => {
  const [person, setPerson] = useState(null)
  const [editForm, setEditForm] = useState("")

  const navigate = useNavigate()

  const { id } = useParams()

  console.log(editForm)

  const handleChange = event => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value })
  }



  const updatePerson = async (event) => {
    event.preventDefault()
    try {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm)
      }

      const response = await fetch(URL + id, options)
      const updatedPerson = await response.json()

      setPerson(updatedPerson)
      setEditForm(updatedPerson)
      console.log(updatedPerson)

    } catch (err) {
      console.log(err)
      navigate(URL)
    }
  }

  const getPerson = async () => {
    try {
      const response = await fetch(URL + id)
      const result = await response.json()

      setPerson(result)
      setEditForm(result)

    } catch (error) {
      console.log(error)
    }
  };


  const removePerson = async () => {
    try {
      const options = {
        method: "DELETE"
      }
      const response = await fetch(URL + id, options)
      await response.json()
      navigate('/')

    } catch (error) {
      console.log(error)
      navigate(URL)
    }
  }

  // console.log(`Current Person: ${JSON.stringify(person)}`)





  useEffect(() => {
    getPerson()
  }, [])


  const loaded = () => (

    <div className="person">
      <h1>Show Page</h1>
      <h2>{person.name}</h2>
      <h2>{person.title}</h2>
      <img src={person.image} alt={person.name + " image"} />
      <div>
        <button className="delete" onClick={removePerson}>
          Remove Person
        </button>
      </div>
      <section>
        <form onSubmit={updatePerson}>
          <span>Name: </span>
          <input
            type="text"
            value={editForm.name}
            name="name"
            placeholder="name"
            onChange={handleChange}
          />
          <span>Image: </span>
          <input
            type="text"
            value={editForm.image}
            name="image"
            placeholder="image URL"
            onChange={handleChange}
          />
          <span>Title: </span>
          <input
            type="text"
            value={editForm.title}
            name="title"
            placeholder="title"
            onChange={handleChange}
          />
          <input type="submit" value="Update Person" />
        </form>
        <h2>Edit This Person</h2>
      </section>
    </div>
  )

  const loading = () => {
    return <h1>Loading.........</h1>

  }

  return person ? loaded() : loading()

}

export default Show