import { signUp, logout, login, onAuthStateChanged } from "./auth";
import { db } from "./config";
import { doc, setDoc, collection, deleteDoc, onSnapshot, getDocs } from "firebase/firestore";

const saveCity = async function(){
    const cityName = document.getElementById("cityname").value.trim()
    const population = document.getElementById("population").value.trim()
    const country = document.getElementById("country").value.trim()

    try{

        const cityRef = doc(db,"cities",cityName.toLowerCase()+"-"+country.toLowerCase())

        await setDoc(cityRef,{
            name: cityName,
            population: population,
            country: country,
            time: new Date()
        })
        console.log("city successfully created")
        document.getElementById("cityname").value = ""
        document.getElementById("population").value = ""
        document.getElementById("country").value = ""

    }catch(error){
        console.error("Error saving city:",error)
    }
}

const addCity = document.querySelector("#addCity")
addCity.addEventListener("submit", (event)=>{
    event.preventDefault()
    saveCity()
})

const deleteCity = async (collectionName, cityID) => {
    try {
        const cityRef = doc(db, collectionName, cityID);
        await deleteDoc(cityRef);
        console.log(`City with ID ${cityID} deleted successfully.`);
    } catch (error) {
        console.error("Error deleting city:", error);
    }
};

const deleteCityForm = document.querySelector("#deleteCity")
deleteCityForm.addEventListener("submit",(event) =>{
    event.preventDefault()
    const city = document.getElementById("cityID").value
    deleteCity("cities",city)
})

/*books stuff*/
const getBooks = async () => {
    try {
        const booksCollection = collection(db, "books");
        const snapshot = await getDocs(booksCollection);
        const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        console.log("List of books:", books); 
    } catch (error) {
        console.error("Error getting books:", error);
    }
};

const saveBooks = async function(){
    const authorName = document.getElementById("author")?.value.trim()
    const bookName = document.getElementById("bookName")?.value.trim()

    try{

        const bookRef = doc(db,"books",bookName.toLowerCase()+"-"+authorName.toLowerCase())

        await setDoc(bookRef,{
            author: authorName,
            book: bookName,
            time: new Date()
        })
        console.log("book successfully created")
        document.getElementById("author").value = ""
        document.getElementById("bookName").value = ""

        await getBooks();

    }catch(error){
        console.error("Error saving book:",error)
    }
}

const addBooks = document.querySelector("#addBooks")
addBooks.addEventListener("submit", (event)=>{
    event.preventDefault()
    saveBooks()
})

document.addEventListener("DOMContentLoaded", () => {
    getBooks();
});

const deleteBook = async (collectionName, bookID) => {
    try {
        const booksID = bookID.trim().toLowerCase(); 
        const bookRef = doc(db, collectionName, booksID);
        await deleteDoc(bookRef);
        console.log(`Book with ID ${booksID} deleted successfully.`);
        await getBooks();
    } catch (error) {
        console.error("Error deleting book:", error);
    }
};

const deleteBookForm = document.querySelector("#deleteBooks")
deleteBookForm.addEventListener("submit",(event) =>{
    event.preventDefault()
    const book = document.getElementById("bookID").value
    deleteBook("books",book)
})