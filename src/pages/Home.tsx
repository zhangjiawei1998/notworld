import ailun from '../asserts/ailun.jpg'
import NavBar from "../components/NavBar";

function Home() {
    return (
        <div className="w-full h-full flex flex-col">
            {/* <NavBar defaultSelectedKey='Home'/> */}
            <div className='flex-grow flex flex-col-reverse md:flex-row justify-around items-center'>
                <div className='animate-slideBottom'>
                    <p className='text-5xl text-center md:text-left font-mono'>Hello,</p>
                    <p className='md:mt-2 text-6xl text-center md:text-left font-mono'>{"It's Not World"}</p>
                    <p className='md:mt-2 text-2xl text-center md:text-left font-mono'>this is a web site for deploy my personal serve</p>
                </div>
                <img src={ailun} alt='avatar'
                    className='w-2/4 md:w-1/4 aspect-square object-cover rounded-full shadow-lg shadow-gray-500 animate-zoomInAndFloat' />
            </div>
        </div>
    )
}
export default Home;