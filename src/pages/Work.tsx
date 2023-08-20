import WorkCard from "../components/WorkCard";

export type workType = {
    name: string,
    desc: string,
    coverImage: string,
    keyword:
    {
        name: string,
        url: string,
    }[]
    ,
    github: string,
}

function Work() {

    const workList: workType[] = [
        {
            name: 'Not Pusher',
            desc: '一个将任意地方的消息推送到微信的工具',
            coverImage: 'https://notzjw.top/asserts/%e5%be%ae%e4%bf%a1%e5%9b%be%e7%89%87_20230820183203.png',
            keyword: [
                {
                    name: 'Flask',
                    url: '',
                },
                {
                    name: 'AES对称加密',
                    url: '',
                },
                {
                    name: 'SHA1签名算法',
                    url: '',
                },
            ],
            github: 'https://github.com/zhangjiawei1998/notpusher',
        },
        {
            name: 'JD Bot',
            desc: '一个京东商品抢购脚本，仅用于学习交流！',
            coverImage: 'https://notzjw.top/asserts/Snipaste_2023-08-20_18-38-09.png',
            keyword: [
                {
                    name: 'PyQt',
                    url: '',
                },
                {
                    name: '爬虫',
                    url: '',
                },
                {
                    name: '多进程多线程',
                    url: '',
                },
            ],
            github: 'https://raw.githubusercontent.com/zhangjiawei1998/Bugbot_v2.0/master/logo.png',
        },
        {
            name: 'ZJUT Auto Clock',
            desc: 'ZJUT自动打卡脚本',
            coverImage: 'https://notzjw.top/asserts/%e5%be%ae%e4%bf%a1%e5%9b%be%e7%89%87_20230820184001.png',
            keyword: [
                {
                    name: 'Flask',
                    url: '',
                },
                {
                    name: 'React',
                    url: '',
                },
                {
                    name: '爬虫',
                    url: '',
                },
            ],
            github: 'https://github.com/zhangjiawei1998/zjut_auto_passcode',
        },
        {
            name: 'Not Album',
            desc: '个人相册, 展示一些自己的照片',
            coverImage: 'https://notzjw.top/source/bgImage.jpg',
            keyword: [
                {
                    name: 'React',
                    url: '',
                },
                {
                    name: 'Next UI',
                    url: '',
                },
                {
                    name: 'Flask',
                    url: '',
                },
            ],
            github: '',
        },
    ]
    return (
        <div className="w-full h-full ">
            <div className="w-full lg:w-2/3 p-6 md:p-10 m-auto flex flex-col items-center gap-10">
                {
                    workList.map(work => <WorkCard work={work} />)
                }
            </div>

        </div>
    )
}
export default Work;