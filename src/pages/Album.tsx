import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import PhotoGallery from "../components/PhotoGallery";
import { AlbumListType } from "../lib/type";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";

function Album() {

    const [albumList, setAlbumList] = useState<AlbumListType>([])
    // const [openAlbumIndex, setOpenAlbumIndex] = useState<Set<React.Key>>(new Set())

    useEffect(() => {
        fetch("https://notzjw.top/notcc/getAlbumInfo").then(value => {
            return value.json()
        }).then(v => {
            setAlbumList(v.albumList)
        })
    }, [])

    return (
        <div className="w-full flex-grow flex flex-col overflow-scroll">
            {/* <NavBar defaultSelectedKey="Album" /> */}
            {
                albumList.map((album, index) => <PhotoGallery album={album} />)
            }
            {/* <Accordion className="flex-grow overflow-scroll" selectionMode="multiple">
                {
                    albumList.map((album, index) =>
                        <AccordionItem
                            key={index}
                            startContent={
                                <div className="ml-10">
                                    <Avatar
                                        isBordered
                                        color="primary"
                                        radius="lg"
                                        src="https://notzjw.top/source/bgImage.jpg"
                                    />
                                </div>

                            }
                            subtitle="4 unread messages"
                            title="Chung Miller"
                        >
                            <PhotoGallery album={album} />
                        </AccordionItem>
                    )
                }
            </Accordion> */}
        </div>
    )
}
export default Album;