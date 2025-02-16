import { useState, useEffect } from 'react'
import './App.css'
import { useForm } from 'react-hook-form'
import appwriteService from './appwrite/config'
import { ID } from 'appwrite'
import Header from './Header'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice'
import authService from './appwrite/auth'
import LandingPage from './LandingPage'

function App() {

  const { status, userData } = useSelector((state) => state.auth);
  const [isFormVisible, setIsFormVisible] = useState(false)
  const dispatch = useDispatch()

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible)
  }

  const [books, setBooks] = useState([])
  const { register, handleSubmit } = useForm()
  const [bookName, setBookName] = useState()
  const [totalChapters, setTotalChapters] = useState()
  const [chaptersCompleted, setChaptersCompleted] = useState()

  const onSubmit = async (data) => {
    try {
        data.slug = String(ID.unique());
        const response = await appwriteService.createNote({...data, userId: userData.$id})
        if(response){
            setIsFormVisible(false)
            setBooks([...books, response])
        }
    } catch (error) {
        console.log('create note error::',error)
    }
  }

  const updateChapter = async (bookId) => {
    try {
      const bookData = await appwriteService.getNote(bookId)
      let count = parseInt(bookData.chaptersCompleted)
      if (count < bookData.totalChapters) {
        count++
        const strCount = String(count)
        await appwriteService.updateNote(bookId, {chaptersCompleted: strCount})
        setBooks(books.map(book => book.$id === bookId ? {...book, chaptersCompleted: strCount} : book))
      } else {
        alert('No more chapters to complete')
      }

    } catch (error) {
      console.log('Update Chapter error::',error);
    }
  }

  const decChapter = async (bookId) => {
    try {
      const bookData = await appwriteService.getNote(bookId)
      let count = parseInt(bookData.chaptersCompleted)
      if (count > 0) {
        count-- 
        const strCount = String(count)
        await appwriteService.updateNote(bookId, {chaptersCompleted: strCount})
        setBooks(books.map(book => book.$id === bookId ? {...book, chaptersCompleted: strCount} : book))
      } else {
        alert('No more chapters to decrease')
      }
    } catch (error) {
      console.log('Decrease Chapter error::',error);
    }
  }

  const deleteBook = async (bookId) => {
    try {
      await appwriteService.deleteNote(bookId);
      setBooks(books.filter(book => book.$id !== bookId))
    } catch (error) {
      console.log('Delete Book error::',error);
    }
  }
  
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    })
  }, [])

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await appwriteService.getNotes();
      if(books){
        setBooks(books.documents)
      }
    }
    fetchBooks();
  }, [setBooks])
  
  return (
    <div className='bg-[#011627] min-h-screen text-center p-4'>
      <Header />
      {status ? (
      <div className="flex items-center justify-center w-full">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="p-4 sm:p-8 w-full space-y-6">
            
              <div className="font-medium w-full flex flex-col gap-2 flex-wrap">
                {books.length === 0 && (
                  <div className="text-center text-gray-400">
                    WoW, such empty!
                  </div>
                )}
                {books.map((book) => (
                  book.userId === userData.$id && (
                  <div className='flex flex-col sm:flex-row justify-between items-center w-full border-s-4 border-[#0c54a7] bg-[#012b4d] text-white text-base sm:text-xl p-3 sm:p-4 rounded-lg gap-4 sm:gap-0' key={book.$id}>
                    <p className="text-center sm:text-left w-full sm:w-auto">{book.bookName}</p>
                      <p className="text-gray-300">
                        {book.chaptersCompleted}/{book.totalChapters}
                      </p>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        className="bg-[#0c54a7] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-[#0c54a7]/80 transition-colors"
                        onClick={() => decChapter(book.$id)}
                      >
                        -
                      </button>
                      <button
                        className="bg-[#0c54a7] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-[#0c54a7]/80 transition-colors"
                        onClick={() => updateChapter(book.$id)}
                      >
                        +
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                        onClick={() => deleteBook(book.$id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 sm:size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>)
                ))}
              </div>
              

            <div className="flex justify-center">
              <button
                onClick={toggleForm}
                className="bg-[#0c54a7] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#0c54a7]/80 transition-colors font-medium text-sm sm:text-base"
              >
                Add New Book
              </button>
            </div>

            {isFormVisible && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-[#012b4d] rounded-xl p-4 sm:p-6 w-full max-w-md relative">
                  <button 
                    onClick={toggleForm}
                    className="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-400 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Add New Book</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 sm:gap-4'>
                    <input 
                      value={bookName} 
                      onChange={(e) => setBookName(e.target.value)} 
                      {...register('bookName')} 
                      className='p-2 sm:p-3 rounded-md bg-[#011627] border border-[#0c54a7]/30 focus:outline-none focus:border-[#0c54a7] transition-colors text-white text-sm sm:text-base' 
                      type="text" 
                      placeholder='Book Name' 
                    />
                    <input 
                      value={totalChapters} 
                      onChange={(e) => setTotalChapters(e.target.value)} 
                      {...register('totalChapters')} 
                      className='p-2 sm:p-3 rounded-md bg-[#011627] border border-[#0c54a7]/30 focus:outline-none focus:border-[#0c54a7] transition-colors text-white text-sm sm:text-base' 
                      type="number" 
                      placeholder='Total Chapters' 
                    />
                    <input 
                      value={chaptersCompleted} 
                      onChange={(e) => setChaptersCompleted(e.target.value)} 
                      {...register('chaptersCompleted')} 
                      className='p-2 sm:p-3 rounded-md bg-[#011627] border border-[#0c54a7]/30 focus:outline-none focus:border-[#0c54a7] transition-colors text-white text-sm sm:text-base' 
                      type="number" 
                      placeholder='Chapters Completed' 
                    />
                    <button className='bg-[#0c54a7] hover:bg-[#0c54a7]/80 text-white px-4 py-2 sm:py-3 rounded-lg transition-colors font-medium text-sm sm:text-base'>
                      Add Book
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      ):(
        <LandingPage />
      )}
    </div>
  )
}

export default App
