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
} from '@chakra-ui/react'

const SongItem: React.FC<{ song: Song }> = ({ song }) => {
    return (
        <div>
            <Accordion allowToggle>
                <AccordionItem>
                    <AccordionButton>
                        <h2 className="text-2xl w-full">
                            {song.songName}
                        </h2>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
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
