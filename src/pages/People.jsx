import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

function People({ URL }) {
    const initForm = {
        name: "",
        image: "",
        title: "",
    }
    // This is the state 
    const [people, setPeople] = useState(null);
    //  This is the state with an object
    const [newForm, setNewForm] = useState(initForm);
    // initial state for when the dom mounts 
    




    const createPeople = async (personData) => {
        try {
            const newPerson = await fetch(URL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(personData)
            })
            getPeople()
        } catch (error) {

        }
    }
    console.log(URL)
    const getPeople = async () => {
        try {
            const myPeople = await fetch(URL);
            const allPeople = await myPeople.json();
            setPeople(allPeople);
        } catch (err) {
            console.log(err);
        }
    }

    console.log(people);

    useEffect(() => {
        getPeople();
    }, []);

    const handleChange = (event) => {
        setNewForm({ ...newForm, [event.target.name]: event.target.value })
    }
    // state in react is immutable 
    // we are required to pass a new value with each set 

    const handleSubmit = async (event) => {
        event.preventDefault()
        await createPeople(newForm)
        setNewForm({ name: "", image: "", title: "" })
    }
    console.log(newForm)



    return (
        <>
            {people ? people.map((person, idx) => {
                return (
                    <>
                        <div key={person._id} className='person-card'>
                            <Link to={`/people/${person._id}`}>
                                <h1>{person.name}</h1>
                                <img src={person.image} alt={person.name} />
                                <h3>{person.title}</h3>
                            </Link>
                        </div>
                    </>
                )
                
            }) : <h1>Loading...</h1>}
            

            <section>
                <h2>Create a new person</h2>
                <form onSubmit={handleSubmit}>
                    <span>Name: </span>
                    <input
                        type="text"
                        value={newForm.name}
                        name="name"
                        placeholder='name'
                        onChange={handleChange}
                    />
                    <span>Image: </span>
                    <input
                        type="text"
                        value={newForm.image}
                        name="image"
                        placeholder='image URL'
                        onChange={handleChange}
                    />
                    <span>Title: </span>
                    <input
                        type="text"
                        value={newForm.title}
                        name="title"
                        placeholder='title'
                        onChange={handleChange}
                    />
                    <input type="submit" value="Create Person" />
                </form>
            </section>
            <div>
                Move this down
            </div>
        </>
    )
}



export default People;