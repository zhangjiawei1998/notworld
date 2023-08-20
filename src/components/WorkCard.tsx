import React from "react";
import { Card, CardBody, Image, Button, Progress, Link } from "@nextui-org/react";
import { workType } from "../pages/Work";

export default function WorkCard({ work }: { work: workType }) {
    return (
        <Card
            isBlurred
            className=" border-none bg-background/60 dark:bg-default-100/50 w-full max-w-[700px]"
            shadow='md'
        >
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-4">
                        <Image
                            alt="Album cover"
                            className="object-cover object-center h-44"
                            height={200}
                            shadow="md"
                            src={work.coverImage}
                            width="100%"
                        />
                    </div>

                    <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-large font-medium mt-2">{work.name}</h1>
                                <p className="text-small text-foreground/80">{work.desc}</p>
                                <p className="text-small font-mono text-foreground/80">keyword: {work.keyword.map(v => v.name).join(' / ')}</p>
                            </div>
                            {
                                work.github !== '' &&
                                <Button
                                    isIconOnly
                                    href={work.github}
                                    as={Link}
                                    className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                    radius="full"
                                    variant="light"
                                >
                                    <svg className='w-1/2 h-1/2 ' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f" />
                                    </svg>
                                </Button>
                            }

                        </div>

                        <div className="flex flex-col mt-3 gap-1">
                            <Progress
                                size="sm"
                                radius="sm"
                                classNames={{
                                    base: "max-w-md",
                                    track: "drop-shadow-md border border-default",
                                    indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                                    label: "tracking-wider text-xs font-medium text-default-600",
                                    value: "text-foreground/60",
                                }}
                                label="完成进度"
                                value={100}
                                showValueLabel={true}
                            />

                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
