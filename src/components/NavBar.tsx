import { Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Tabs, Tab } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";


export default function NavBar({ defaultSelectedKey }: { defaultSelectedKey: "Home" | "Album" }) {

    const navigate = useNavigate()

    return (
        <div className="w-screen h-[100px] p-4 flex flex-row justify-around items-center bg-transparent backdrop-blur-md">
            <div>
                <p className="text-3xl font-mono font-bold pt-3">Not World</p>
            </div>
            <Tabs
                defaultSelectedKey={defaultSelectedKey}
                color="primary"
                variant="underlined"
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full bg-[#22d3ee]",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-[#06b6d4]"
                }}>
                <Tab
                    key="Home"
                    title={
                        <div className="flex items-center" onClick={() => navigate("/")}>
                            <span className="text-3xl font-mono font-bold">Home</span>
                        </div>
                    }
                />
                <Tab
                    key="Album"
                    title={
                        <div className="flex items-center" onClick={() => navigate("/album")}>
                            <span className="text-3xl font-mono font-bold">Album</span>
                        </div>
                    }
                />
            </Tabs >
            <div>
            </div>
        </div>

    )
}
