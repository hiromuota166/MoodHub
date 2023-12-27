import React, { Suspense } from "react";
import ShowSpotify from "./ShowSpotify";
import { Song } from "@/lib/apollo/gql/graphql";
import IsLoading from "./IsLoading";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react";

const SongItem: React.FC<{ song: Song }> = ({ song }) => {
    return (
        <div>
            <Accordion allowToggle>
                <AccordionItem>
                    <AccordionButton>
                        <div className="block text-left w-full">
                            <h2 className="text-xl font-semibold w-full">{song.songName}</h2>
                            <h3 className="text-sm">
                                {song.categories.map((category, i) => {
                                    return (
                                        <span
                                            key={i}
                                            className="inline-block rounded-full px-1"
                                        >
                                            {category}
                                        </span>
                                    )
                                }
                                )}
                            </h3>

                        </div>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel p={2}>
                        <Suspense fallback={<IsLoading />}>
                            <ShowSpotify trackId={song.trackId} />
                        </Suspense>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default SongItem;
