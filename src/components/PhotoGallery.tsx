import { MouseEventHandler, TouchEventHandler, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Image, Link } from "@nextui-org/react";
import { AlbumType, ImageType } from "../lib/type";
import downloadPhoto from "../lib/downloadPhoto";
const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};
/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 3000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};



const PhotoGallery = ({
  album
}: {
  album: AlbumType
}) => {


  /**
   * curIndex: null为未开启预览 number为当前预览在iamgeList中的索引
   * direction: 1为下一张 -1为上一张
   */
  const [[curIndex, direction], setPaginate] = useState<[null | number, -1 | 1]>([null, 1])

  // 相册行为 action: 
  //  ['open', number]: 开启预览
  //  'close' : 关闭预览
  //  'prev' : 上一张照片
  //  'next' : 上一张照片
  //  ['to', number]: 切换到哪一张
  const paginate = (action: ['open', number] | 'close' | 'prev' | 'next' | ['to', number]) => {
    switch (action) {
      case 'prev':
        if (curIndex === 0) return
        setPaginate(prev => [prev[0] as number - 1, -1])
        break
      case 'next':
        if (curIndex === album.imageList.length - 1) return
        setPaginate(prev => [prev[0] as number + 1, 1])
        break
      case 'close':
        setPaginate([null, 1])
        document.removeEventListener('keyup', keycallback, false)
        break
      default:
        if (action[0] === 'open') {
          setPaginate([action[1], 1])
          document.addEventListener('keyup', keycallback, false)
        } else if (action[0] === 'to') {
          if (curIndex === null) return
          setPaginate([action[1], action[1] < curIndex ? -1 : 1])
        }
    }
  }

  // 相册行为的键盘快捷键
  const keycallback = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        paginate('close')
        break
      case 'ArrowLeft':
        paginate('prev')
        break
      case 'ArrowRight':
        paginate('next')
        break
    }
  }

  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set())

  console.log([curIndex, direction])
  return (
    <>
      <div className="w-full max-w-[3000px] m-auto p-10 columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 bg-transparent">
        {
          album.imageList.map((image, index) =>
            <div key={image.id} className='relative brightness-90 hover:brightness-100 
              transition-all will-change-auto animate-slideBottom cursor-zoom-in'>
              <Image
                loading="lazy"
                onClick={() => paginate(['open', index])}
                className={`rounded-lg mb-4 `}
                width={image.rw300_width} height={image.rw300_height}
                src={image.rw300_url} alt="image"
              />
              <label className="absolute cursor-pointer inset-0 bg-transparent" htmlFor={image.id} />
              <input
                id={image.id}
                className={`absolute top-1 right-1 checkbox checkbox-success bg-white border-2 `}
                checked={selectedImages.has(index)}
                onChange={(e) => {
                  setSelectedImages(prev => {
                    if (e.target.checked) {
                      prev.add(index)
                    } else {
                      prev.delete(index)
                    }
                    return new Set(prev)
                  })
                }}
                type="checkbox"
              />
            </div>

          )
        }
      </div>
      {
        // 预览界面工具栏
        curIndex !== null &&
        <div className="absolute inset-0 p-4 bg-transparent backdrop-blur-md z-[999]">
          {/* Main image */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              className="absolute inset-0 lg:top-2 flex justify-center z-30 bg-inherit"
              key={album.imageList[curIndex].id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                // offset鼠标拖拽的偏移 velocity鼠标拖拽的速度
                // swipe模拟物理引擎
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate('next')
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate('prev')
                }
              }}
            >
              <div className="relative h-full lg:h-[80%] xl:h-[85%] bg-inherit">
                <img
                  onMouseDown={(e) => e.preventDefault()} // 通过禁止鼠标按键来 原生拖拽事件
                  className="w-auto h-full object-contain m-auto rounded-lg bg-inherit"
                  src={album.imageList[curIndex].origin_url}
                  alt="Next.js Conf image"
                />
                <div className="absolute inset-x-1 top-1 flex flex-row-reverse gap-1 bg-transparent">
                  <Button
                    className="rounded-full bg-white/50 p-1 lg:p-2 backdrop-blur-sm transition hover:bg-white/75"
                    onClick={() => paginate('close')}
                    title="关闭预览"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                  </Button>
                  {/* <Button
                    className="rounded-full bg-white/50 p-1 lg:p-2 backdrop-blur-sm transition hover:bg-white/75"
                    onClick={() => downloadPhoto(album.imageList[curIndex].origin_url, album.imageList[curIndex].id)}
                    title="下载原图"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
                    </svg>
                  </Button> */}
                  <Button
                    radius="full"
                    className="rounded-full bg-white/50 p-1 lg:p-2 backdrop-blur-sm transition hover:bg-white/75"
                    href={album.imageList[curIndex].origin_url}
                    as={Link}
                    variant="solid"
                    title="打开网页查看原图"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </Button>
                </div>

              </div>

            </motion.div>
          </AnimatePresence >

          {/* Buttons + bottom nav bar */}
          <div className="absolute inset-0 p-4 bg-inherit " >
            {
              curIndex > 0 &&
              <Button
                className="absolute left-3 top-[calc(50%-24px)] rounded-full z-50
                 bg-white/50 p-1 lg:p-2 backdrop-blur-sm transition hover:bg-white/75 focus:outline-none"
                style={{ transform: 'translate3d(0, 0, 0)' }} // 强制GPU硬件加速
                onClick={() => paginate('prev')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>

              </Button>
            }
            {
              curIndex < (album.imageList.length - 1) &&
              < Button
                className="absolute right-3 top-[calc(50%-24px)] rounded-full z-50
               bg-white/50 p-1 lg:p-2 backdrop-blur-sm transition hover:bg-white/75"
                style={{ transform: 'translate3d(0, 0, 0)' }} // 强制GPU硬件加速
                onClick={() => paginate('next')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Button>
            }


            <div className="fixed inset-x-0 hidden lg:inline z-30 lg:visible bottom-0 overflow-hidden bg-inherit">
              <motion.div
                initial={false}
                className="mx-auto mt-6 mb-4 flex aspect-[3/2] h-10 "
              >
                <AnimatePresence initial={false}>
                  {
                    album.imageList.map((image, index) => {
                      let globalIndex = index
                      return (
                        <motion.button
                          key={image.id}
                          initial={{
                            width: '0%',
                          }}
                          animate={{
                            scale: globalIndex === curIndex ? 1.25 : 1,
                            width: '100%',
                            x: `${curIndex * -100}%`,
                          }}
                          exit={{ width: '0%' }}
                          onClick={() => paginate(['to', globalIndex])}
                          className={`${globalIndex === curIndex
                            ? 'z-50 rounded-lg shadow shadow-black/50'
                            : 'z-10'
                            } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                        >
                          <Image
                            radius="sm"
                            alt="small photos on the bottom"
                            width={180}
                            height={120}
                            className={`${globalIndex === curIndex
                              ? 'brightness-110 hover:brightness-110'
                              : 'brightness-50 contrast-125 hover:brightness-75'
                              } h-full transform object-cover transition`}
                            src={image.rw300_url}
                          />
                        </motion.button>
                      )
                    })
                  }
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div >
      }
      {
        <div className="absolute inset-x-0 top-2 z-50 flex justify-center">
        </div >
      }

    </>
  )
}


export default PhotoGallery;