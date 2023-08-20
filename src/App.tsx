import Home from './pages/Home';
import Album from './pages/Album';
import { Link, Tab, Tabs } from '@nextui-org/react';
import { useState } from 'react';
import Work from './pages/Work';

function App() {

  const pageList = [
    { name: 'Home', key: 'Home' },
    { name: 'Album', key: 'Album' },
    { name: 'Work', key: 'Work' },
  ]

  const [curPage, setCurPage] = useState('Home')

  return (
    <div className="App w-screen h-screen flex flex-col" >
      <div className="w-screen h-[100px] fixed z-50 p-4 flex flex-row justify-around items-center bg-transparent backdrop-blur-md">
        <div className='hidden md:block'>
          <p className="text-3xl font-mono font-bold pt-3">Not World🤖</p>
        </div>
        <Tabs
          selectedKey={curPage}
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-10 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-[#12A150]",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-[#12A150]"
          }}>
          {
            pageList.map((page) =>
              <Tab
                key={page.key}
                title={
                  <div className="flex items-center" onClick={() => setCurPage(page.key)}>
                    <span className="text-3xl font-mono font-bold">{page.name}</span>
                  </div>
                }
              />
            )
          }
        </Tabs >
        <Link isBlock href='https://github.com/zhangjiawei1998' color="primary"
          className='aspect-square h-2/3 cursor-pointer'>
          <svg className='w-full h-full ' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f" />
          </svg>
        </Link>
      </div>

      <div className='w-screen h-[100px] flex-shrink-0'>

      </div>
      {
        curPage === 'Home' &&
        <Home />
      }
      {
        curPage === 'Album' &&
        <Album />
      }
      {
        curPage === 'Work' &&
        <Work />
      }
    </div>
  );
}

export default App;
